import React, { useState, useRef, useEffect, useCallback } from 'react';
import { MessageSquare, Phone, X, Mic, Send, Minimize2, Loader2, Volume2, VolumeX } from 'lucide-react';
import { GoogleGenAI, LiveServerMessage, Modality, Blob, Chat, GenerateContentResponse } from '@google/genai';
import { ChatMessage } from '../types';

// Helper for blob creation
function createBlob(data: Float32Array): Blob {
  const l = data.length;
  const int16 = new Int16Array(l);
  for (let i = 0; i < l; i++) {
    int16[i] = data[i] * 32768;
  }
  return {
    data: encode(new Uint8Array(int16.buffer)),
    mimeType: 'audio/pcm;rate=16000',
  };
}

// Helpers for encoding/decoding
function encode(bytes: Uint8Array) {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<'chat' | 'voice'>('chat');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Xin chào! Tôi là trợ lý ảo Lumière. Tôi có thể giúp gì cho bạn hôm nay?' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [volume, setVolume] = useState(0); // For visualizing voice activity

  // Live API refs
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const inputAudioContextRef = useRef<AudioContext | null>(null);
  const outputAudioContextRef = useRef<AudioContext | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const sessionRef = useRef<any>(null); // To store the session object

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Standard Chat Handler
  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMsg = inputValue;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInputValue('');
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const chat = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
            systemInstruction: "Bạn là trợ lý thời trang của Lumière, một thương hiệu thời trang cao cấp. Phong cách trả lời của bạn: lịch sự, tinh tế, am hiểu thời trang, và ngắn gọn. Hãy giúp khách hàng tư vấn sản phẩm, phối đồ và đặt lịch hẹn."
        },
        history: messages.map(m => ({ role: m.role, parts: [{ text: m.text }] }))
      });

      const result: GenerateContentResponse = await chat.sendMessage({ message: userMsg });
      const response = result.text;

      setMessages(prev => [...prev, { role: 'model', text: response || '' }]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "Xin lỗi, hiện tại tôi đang gặp sự cố kết nối. Vui lòng thử lại sau." }]);
    } finally {
      setIsLoading(false);
    }
  };

  // Live API Voice Handler
  const startVoiceSession = async () => {
    setIsVoiceActive(true);
    setMode('voice');

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const inputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      const outputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      
      inputAudioContextRef.current = inputCtx;
      outputAudioContextRef.current = outputCtx;
      
      const outputNode = outputCtx.createGain();
      outputNode.connect(outputCtx.destination); // Connect to speakers

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-09-2025',
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } },
          },
          systemInstruction: "Bạn là nhân viên tư vấn giọng nói của Lumière. Hãy nói chuyện thật tự nhiên, nhẹ nhàng, và sang trọng bằng Tiếng Việt. Giúp khách hàng chọn đồ.",
        },
        callbacks: {
            onopen: () => {
                console.log("Voice session connected");
                const source = inputCtx.createMediaStreamSource(stream);
                const scriptProcessor = inputCtx.createScriptProcessor(4096, 1, 1);
                
                scriptProcessor.onaudioprocess = (e) => {
                    const inputData = e.inputBuffer.getChannelData(0);
                    // Visualize volume roughly
                    let sum = 0;
                    for(let i=0; i<inputData.length; i++) sum += inputData[i] * inputData[i];
                    setVolume(Math.sqrt(sum / inputData.length) * 100);

                    const pcmBlob = createBlob(inputData);
                    sessionPromise.then(session => {
                        session.sendRealtimeInput({ media: pcmBlob });
                    });
                };

                source.connect(scriptProcessor);
                scriptProcessor.connect(inputCtx.destination);
            },
            onmessage: async (message: LiveServerMessage) => {
                 const base64Audio = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
                 if (base64Audio) {
                    // Update nextStartTime to ensure gapless playback
                    nextStartTimeRef.current = Math.max(nextStartTimeRef.current, outputCtx.currentTime);

                    const audioBuffer = await decodeAudioData(
                        decode(base64Audio),
                        outputCtx,
                        24000,
                        1
                    );

                    const source = outputCtx.createBufferSource();
                    source.buffer = audioBuffer;
                    source.connect(outputNode);
                    
                    source.addEventListener('ended', () => {
                        sourcesRef.current.delete(source);
                    });

                    source.start(nextStartTimeRef.current);
                    nextStartTimeRef.current += audioBuffer.duration;
                    sourcesRef.current.add(source);
                 }
            },
            onclose: () => {
                console.log("Voice session closed");
                cleanupVoiceSession();
            },
            onerror: (err) => {
                console.error("Voice session error", err);
                cleanupVoiceSession();
            }
        }
      });
      
      sessionRef.current = sessionPromise;

    } catch (error) {
      console.error("Failed to start voice session:", error);
      cleanupVoiceSession();
    }
  };

  const cleanupVoiceSession = () => {
    setIsVoiceActive(false);
    setMode('chat');
    setVolume(0);

    // Close Audio Contexts
    if (inputAudioContextRef.current) {
      inputAudioContextRef.current.close();
      inputAudioContextRef.current = null;
    }
    if (outputAudioContextRef.current) {
      outputAudioContextRef.current.close();
      outputAudioContextRef.current = null;
    }
    
    // Clear sources
    sourcesRef.current.forEach(source => source.stop());
    sourcesRef.current.clear();
    nextStartTimeRef.current = 0;
    
    // Close session if possible (wrapper usually handles this via disconnect or dereference)
    // Note: The SDK documentation says use session.close(), but sessionPromise returns the session.
    if (sessionRef.current) {
        sessionRef.current.then((s: any) => {
            if (s && typeof s.close === 'function') s.close();
        });
        sessionRef.current = null;
    }
  };

  const handleStopVoice = () => {
      cleanupVoiceSession();
  };


  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 bg-lumiere-green text-white p-4 rounded-full shadow-lg hover:bg-lumiere-green-dark transition-all duration-300 hover:scale-110 flex items-center gap-2"
        >
          <MessageSquare size={24} />
          <span className="text-sm font-medium pr-1">Chat/Tư vấn</span>
        </button>
      )}

      {/* Main Widget */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[90vw] md:w-[380px] h-[500px] bg-white rounded-xl shadow-2xl flex flex-col overflow-hidden border border-stone-200 animate-fade-in-up">
          
          {/* Header */}
          <div className="bg-lumiere-green-dark p-4 flex justify-between items-center text-white">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                 {mode === 'voice' ? <Mic size={16} /> : <MessageSquare size={16} />}
              </div>
              <div>
                <h3 className="font-serif font-medium">Lumière Assistant</h3>
                <p className="text-[10px] text-stone-300 uppercase tracking-wider">AI Stylist</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => setIsOpen(false)} className="text-white/70 hover:text-white">
                <Minimize2 size={18} />
              </button>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 flex flex-col relative bg-stone-50">
            
            {/* Chat Mode View */}
            {mode === 'chat' && (
              <>
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[80%] p-3 rounded-lg text-sm leading-relaxed ${
                        msg.role === 'user' 
                          ? 'bg-lumiere-green text-white rounded-br-none' 
                          : 'bg-white border border-stone-200 text-stone-700 rounded-bl-none shadow-sm'
                      }`}>
                        {msg.text}
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-white border border-stone-200 p-3 rounded-lg rounded-bl-none shadow-sm">
                        <Loader2 size={16} className="animate-spin text-lumiere-green" />
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
                
                {/* Input Area */}
                <div className="p-4 bg-white border-t border-stone-200">
                  <div className="flex gap-2 items-center">
                    <button 
                      onClick={startVoiceSession}
                      className="p-2 text-lumiere-green hover:bg-lumiere-green/10 rounded-full transition-colors"
                      title="Gọi điện tư vấn"
                    >
                      <Phone size={20} />
                    </button>
                    <div className="flex-1 relative">
                        <input
                          type="text"
                          value={inputValue}
                          onChange={(e) => setInputValue(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                          placeholder="Nhập tin nhắn..."
                          className="w-full bg-stone-100 border-none rounded-full py-2 px-4 text-sm focus:ring-1 focus:ring-lumiere-green outline-none"
                        />
                    </div>
                    <button 
                      onClick={handleSendMessage}
                      disabled={!inputValue.trim() || isLoading}
                      className="p-2 bg-lumiere-green text-white rounded-full hover:bg-lumiere-green-dark disabled:opacity-50 transition-colors"
                    >
                      <Send size={18} />
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* Voice Mode View */}
            {mode === 'voice' && (
               <div className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-8 bg-gradient-to-b from-stone-900 to-lumiere-green-dark text-white">
                  <div className="relative">
                     {/* Pulsing effect based on volume/activity */}
                     <div className={`absolute inset-0 bg-white/20 rounded-full blur-xl transition-all duration-100`} style={{ transform: `scale(${1 + volume/50})` }}></div>
                     <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm relative z-10 border border-white/20">
                        <Mic size={40} className="text-white animate-pulse" />
                     </div>
                  </div>
                  
                  <div>
                    <h4 className="font-serif text-2xl mb-2">Đang kết nối với Stylist...</h4>
                    <p className="text-white/60 text-sm font-light">Hãy nói câu hỏi của bạn, chúng tôi đang lắng nghe.</p>
                  </div>

                  <button 
                    onClick={handleStopVoice}
                    className="px-6 py-3 bg-red-500/80 hover:bg-red-600 text-white rounded-full flex items-center gap-2 transition-all"
                  >
                    <Phone size={18} className="rotate-[135deg]" />
                    <span>Kết thúc cuộc gọi</span>
                  </button>
               </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default AIAssistant;