import React, { useEffect, useState } from 'react';

const FloatingMenu: React.FC = () => {
    const [activeSection, setActiveSection] = useState<string>('');

    const sections = [
        { id: 'womens-jackets', label: 'Áo Khoác Nữ' },
        { id: 'womens-tops', label: 'Top Nữ' },
        { id: 'womens-bottoms', label: 'Bottom Nữ' },
        { id: 'mens-outfit', label: 'Nam' },
        { id: 'girls-outfit', label: 'Bé Gái' },
        { id: 'boys-outfit', label: 'Bé Trai' },
    ];

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + window.innerHeight / 2;

            for (const section of sections) {
                const element = document.getElementById(section.id);
                if (element) {
                    const { offsetTop, offsetHeight } = element;
                    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                        setActiveSection(section.id);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const headerOffset = 100;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-40 hidden lg:flex flex-col gap-4">
            {sections.map((section) => (
                <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className="group flex items-center justify-end relative"
                >
                    <span
                        className={`absolute right-8 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap ${activeSection === section.id ? 'opacity-100' : ''
                            }`}
                    >
                        {section.label}
                    </span>
                    <div
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${activeSection === section.id
                                ? 'bg-black scale-125 ring-4 ring-black/20'
                                : 'bg-gray-300 hover:bg-gray-500'
                            }`}
                    />
                </button>
            ))}
        </div>
    );
};

export default FloatingMenu;
