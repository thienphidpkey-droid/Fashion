import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useProducts } from '../context/ProductContext';
import { Product } from '../types';
import { Save, Search, Plus, X } from 'lucide-react';

const AdminPage: React.FC = () => {
    const { products, updateProduct, addProduct } = useProducts();
    const [searchTerm, setSearchTerm] = useState('');
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editForm, setEditForm] = useState<Partial<Product>>({});

    // Add Product State
    const [isAdding, setIsAdding] = useState(false);
    const [newProductForm, setNewProductForm] = useState<Partial<Product>>({
        name: '',
        price: '',
        image: '',
        tag: '',
        category: ''
    });

    const sections = [
        { id: 'womens-jackets', name: 'Áo Khoác Nữ' },
        { id: 'womens-tops', name: 'Outfit Top Nữ' },
        { id: 'womens-bottoms', name: 'Outfit Bottom Nữ' },
        { id: 'mens-outfit', name: 'Outfit Nam' },
        { id: 'girls-outfit', name: 'Outfit Bé Gái' },
        { id: 'boys-outfit', name: 'Outfit Bé Trai' },
    ];

    const [activeTab, setActiveTab] = useState(sections[0].id);

    const handleEditClick = (product: Product) => {
        setEditingId(product.id);
        setEditForm(product);
    };

    const handleSave = (sectionId: string) => {
        if (editingId && editForm.id) {
            updateProduct(sectionId, editForm as Product);
            setEditingId(null);
            setEditForm({});
        }
    };

    const handleCancel = () => {
        setEditingId(null);
        setEditForm({});
    };

    const handleAddProduct = () => {
        if (newProductForm.name && newProductForm.price && newProductForm.image) {
            const newId = `${activeTab}-${Date.now()}`;
            const productToAdd: Product = {
                id: newId,
                name: newProductForm.name,
                price: newProductForm.price,
                image: newProductForm.image,
                category: sections.find(s => s.id === activeTab)?.name || 'Fashion',
                tag: newProductForm.tag
            };

            addProduct(activeTab, productToAdd);
            setIsAdding(false);
            setNewProductForm({ name: '', price: '', image: '', tag: '', category: '' });
        } else {
            alert('Vui lòng điền đầy đủ Tên, Giá và Link ảnh');
        }
    };

    const filteredProducts = products[activeTab]?.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
            <Helmet>
                <title>Admin Dashboard | LUMIÈRE</title>
                <meta name="robots" content="noindex, nofollow" />
            </Helmet>
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Quản Lý Sản Phẩm</h1>
                    <div className="flex gap-4">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Tìm kiếm sản phẩm..."
                                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
                        </div>
                        <button
                            onClick={() => setIsAdding(true)}
                            className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                        >
                            <Plus size={20} />
                            Thêm Mới
                        </button>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex overflow-x-auto gap-2 mb-6 pb-2">
                    {sections.map((section) => (
                        <button
                            key={section.id}
                            onClick={() => setActiveTab(section.id)}
                            className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${activeTab === section.id
                                    ? 'bg-black text-white'
                                    : 'bg-white text-gray-600 hover:bg-gray-100'
                                }`}
                        >
                            {section.name}
                        </button>
                    ))}
                </div>

                {/* Add Product Modal */}
                {isAdding && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                        <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-2xl">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-bold">Thêm Sản Phẩm Mới</h2>
                                <button onClick={() => setIsAdding(false)} className="p-2 hover:bg-gray-100 rounded-full">
                                    <X size={20} />
                                </button>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Tên sản phẩm</label>
                                    <input
                                        type="text"
                                        className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-black focus:border-transparent"
                                        value={newProductForm.name}
                                        onChange={(e) => setNewProductForm({ ...newProductForm, name: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Giá</label>
                                    <input
                                        type="text"
                                        className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-black focus:border-transparent"
                                        value={newProductForm.price}
                                        onChange={(e) => setNewProductForm({ ...newProductForm, price: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Link Ảnh</label>
                                    <input
                                        type="text"
                                        className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-black focus:border-transparent"
                                        value={newProductForm.image}
                                        onChange={(e) => setNewProductForm({ ...newProductForm, image: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Tag (Optional)</label>
                                    <input
                                        type="text"
                                        className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-black focus:border-transparent"
                                        value={newProductForm.tag}
                                        onChange={(e) => setNewProductForm({ ...newProductForm, tag: e.target.value })}
                                    />
                                </div>
                                <button
                                    onClick={handleAddProduct}
                                    className="w-full py-3 bg-black text-white rounded-lg font-bold hover:bg-gray-800 transition-colors mt-4"
                                >
                                    Thêm Sản Phẩm
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Product Table */}
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hình ảnh</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tên sản phẩm</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Giá</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tag</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Hành động</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredProducts.map((product) => (
                                    <tr key={product.id}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="h-16 w-16 rounded-lg overflow-hidden bg-gray-100 relative group">
                                                <img src={product.image} alt="" className="h-full w-full object-cover" />
                                                {editingId === product.id && (
                                                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                                        <input
                                                            type="text"
                                                            className="absolute inset-0 opacity-0 cursor-pointer"
                                                            title="Paste image URL here"
                                                            onChange={(e) => setEditForm({ ...editForm, image: e.target.value })}
                                                        />
                                                        <span className="text-white text-xs text-center px-1">Click to Edit URL</span>
                                                    </div>
                                                )}
                                            </div>
                                            {editingId === product.id && (
                                                <input
                                                    type="text"
                                                    className="mt-2 w-full text-xs border border-gray-300 rounded p-1"
                                                    placeholder="Image URL"
                                                    value={editForm.image || ''}
                                                    onChange={(e) => setEditForm({ ...editForm, image: e.target.value })}
                                                />
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            {editingId === product.id ? (
                                                <input
                                                    type="text"
                                                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black"
                                                    value={editForm.name || ''}
                                                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                                                />
                                            ) : (
                                                <div className="text-sm font-medium text-gray-900">{product.name}</div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {editingId === product.id ? (
                                                <input
                                                    type="text"
                                                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black"
                                                    value={editForm.price || ''}
                                                    onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
                                                />
                                            ) : (
                                                <div className="text-sm text-gray-500">{product.price}</div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {editingId === product.id ? (
                                                <input
                                                    type="text"
                                                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black"
                                                    value={editForm.tag || ''}
                                                    onChange={(e) => setEditForm({ ...editForm, tag: e.target.value })}
                                                    placeholder="Optional"
                                                />
                                            ) : (
                                                product.tag && (
                                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                        {product.tag}
                                                    </span>
                                                )
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            {editingId === product.id ? (
                                                <div className="flex justify-end gap-2">
                                                    <button
                                                        onClick={() => handleSave(activeTab)}
                                                        className="text-green-600 hover:text-green-900"
                                                    >
                                                        <Save size={20} />
                                                    </button>
                                                    <button
                                                        onClick={handleCancel}
                                                        className="text-red-600 hover:text-red-900"
                                                    >
                                                        Huỷ
                                                    </button>
                                                </div>
                                            ) : (
                                                <button
                                                    onClick={() => handleEditClick(product)}
                                                    className="text-indigo-600 hover:text-indigo-900"
                                                >
                                                    Sửa
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminPage;
