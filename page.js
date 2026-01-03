'use client';

import React, { useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Box, Plane } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Maximize2, Grid3x3, Package, Send, Download, Eye, Edit3, Sofa, Bed, Users, ChevronRight, ChefHat, Flame, Droplet, UtensilsCrossed, Sparkles } from 'lucide-react';

// 3D Room Component
function Room3D({ room, furniture }) {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.05;
    }
  });

  return (
    <group ref={meshRef}>
      <Plane args={[room.width / 10, room.height / 10]} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#e8e4dc" />
      </Plane>
      
      <Box args={[room.width / 10, 0.3, 0.05]} position={[0, 0.15, -room.height / 20]}>
        <meshStandardMaterial color="#c9b8a3" />
      </Box>
      <Box args={[room.width / 10, 0.3, 0.05]} position={[0, 0.15, room.height / 20]}>
        <meshStandardMaterial color="#c9b8a3" />
      </Box>
      <Box args={[0.05, 0.3, room.height / 10]} position={[-room.width / 20, 0.15, 0]}>
        <meshStandardMaterial color="#c9b8a3" />
      </Box>
      <Box args={[0.05, 0.3, room.height / 10]} position={[room.width / 20, 0.15, 0]}>
        <meshStandardMaterial color="#c9b8a3" />
      </Box>

      {furniture.map((item, idx) => (
        <Box 
          key={idx} 
          args={[0.3, 0.2, 0.3]} 
          position={[
            (item.x - room.x - room.width / 2) / 50,
            0.1,
            (item.y - room.y - room.height / 2) / 50
          ]}
        >
          <meshStandardMaterial color={item.color || '#8b7355'} />
        </Box>
      ))}
    </group>
  );
}

function Scene3D({ rooms, furniture }) {
  return (
    <Canvas camera={{ position: [3, 3, 3], fov: 50 }} style={{ background: '#1a1612' }}>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={0.8} />
      <pointLight position={[-10, -10, -10]} intensity={0.3} />
      
      {rooms.map((room, idx) => (
        <Room3D key={idx} room={room} furniture={furniture.filter(f => 
          f.x >= room.x && f.x <= room.x + room.width &&
          f.y >= room.y && f.y <= room.y + room.height
        )} />
      ))}
      
      <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
    </Canvas>
  );
}

export default function GrundrissRatgeber() {
  const [activeTab, setActiveTab] = useState('editor');
  const [rooms, setRooms] = useState([
    { id: 1, name: 'Wohnzimmer', x: 50, y: 50, width: 200, height: 150, color: '#d4c5b0' },
    { id: 2, name: 'Küche', x: 270, y: 50, width: 150, height: 150, color: '#c9b8a3' }
  ]);
  const [furniture, setFurniture] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [draggedFurniture, setDraggedFurniture] = useState(null);
  const canvasRef = useRef(null);
  const [selectedKitchenLayout, setSelectedKitchenLayout] = useState(null);

  const furnitureItems = [
    { id: 'sofa', name: 'Sofa', icon: Sofa, color: '#8b7355', affiliate: 'IKEA Landskrona', price: '€899', commission: '€72' },
    { id: 'bed', name: 'Bett', icon: Bed, color: '#a08875', affiliate: 'IKEA Malm', price: '€399', commission: '€32' },
    { id: 'table', name: 'Esstisch', icon: Users, color: '#6b5d52', affiliate: 'Otto Esstisch', price: '€549', commission: '€44' }
  ];

  const kitchenLayouts = [
    { 
      id: 'l-form', 
      name: 'L-Form Küche', 
      description: 'Perfekt für mittelgroße Räume',
      price: '€12.999',
      features: ['Optimale Raumnutzung', 'Viel Arbeitsfläche', 'Flexible Planung'],
      partner: 'KüchenAtlas',
      commission: '€1.300'
    },
    { 
      id: 'u-form', 
      name: 'U-Form Küche', 
      description: 'Maximum an Stauraum',
      price: '€18.999',
      features: ['Kurze Wege', 'Viel Stauraum', 'Premium-Optik'],
      partner: 'Küchen Quelle',
      commission: '€1.900'
    },
    { 
      id: 'zeile', 
      name: 'Küchenzeile', 
      description: 'Ideal für offene Wohnkonzepte',
      price: '€8.999',
      features: ['Platzsparend', 'Modern', 'Günstig'],
      partner: 'IKEA Küchen',
      commission: '€630'
    },
    { 
      id: 'insel', 
      name: 'Inselküche', 
      description: 'Der Luxus für große Räume',
      price: '€24.999',
      features: ['Kommunikativ', 'Repräsentativ', 'Viel Arbeitsfläche'],
      partner: 'Küchen Prinz',
      commission: '€3.750'
    }
  ];

  const kitchenElementsLib = [
    { id: 'stove', name: 'Herd', icon: Flame, color: '#dc2626', description: 'Induktion/Gas' },
    { id: 'sink', name: 'Spüle', icon: Droplet, color: '#3b82f6', description: 'Einzel/Doppel' },
    { id: 'counter', name: 'Arbeitsplatte', icon: UtensilsCrossed, color: '#78716c', description: 'Granit/Holz' },
    { id: 'fridge', name: 'Kühlschrank', icon: Package, color: '#e5e7eb', description: 'Side-by-Side' }
  ];

  const handleCanvasClick = (e) => {
    if (!canvasRef.current || !draggedFurniture) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setFurniture([...furniture, {
      ...draggedFurniture,
      x,
      y,
      id: Date.now()
    }]);
    setDraggedFurniture(null);
  };

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    region: '',
    budget: ''
  });

  const [kitchenFormData, setKitchenFormData] = useState({
    name: '',
    email: '',
    phone: '',
    region: '',
    layout: '',
    budget: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('🎉 Danke! Ein Bauträger wird sich in Kürze bei Ihnen melden.\n\n(Dies ist ein Demo-Prototyp)');
  };

  const handleKitchenSubmit = (e) => {
    e.preventDefault();
    alert('🎉 Danke! Ein Küchen-Experte wird sich in Kürze bei Ihnen melden.\n\nIhr 3D-Grundriss wurde übermittelt.\n\n(Dies ist ein Demo-Prototyp)');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-amber-50 to-stone-100" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {/* Header */}
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="bg-gradient-to-r from-stone-800 via-amber-900 to-stone-900 text-white py-8 px-6 shadow-2xl relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.1) 35px, rgba(255,255,255,.1) 70px)'
          }} />
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-4"
          >
            <div className="bg-amber-600 p-3 rounded-xl shadow-lg">
              <Home size={32} />
            </div>
            <div>
              <h1 className="text-5xl font-bold tracking-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>
                Grundriss<span className="text-amber-400">Ratgeber</span>
              </h1>
              <p className="text-amber-200 mt-1 text-lg">Dein Traumhaus. Digital geplant. Real gebaut.</p>
            </div>
          </motion.div>
        </div>
      </motion.header>

      {/* Navigation */}
      <nav className="bg-white border-b-2 border-amber-200 sticky top-0 z-40 shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex gap-2 overflow-x-auto">
          {[
            { id: 'editor', label: '2D Editor', icon: Grid3x3 },
            { id: '3d', label: '3D Vorschau', icon: Eye },
            { id: 'furniture', label: 'Möbel', icon: Package },
            { id: 'kitchen', label: 'Küchen', icon: ChefHat, badge: 'NEU' },
            { id: 'bautraeger', label: 'Bauträger', icon: Send }
          ].map((tab) => (
            <motion.button
              key={tab.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-lg'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              <tab.icon size={20} />
              {tab.label}
              {tab.badge && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full animate-pulse">
                  {tab.badge}
                </span>
              )}
            </motion.button>
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <AnimatePresence mode="wait">
          {activeTab === 'editor' && (
            <motion.div
              key="editor"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
              <div className="lg:col-span-2">
                <div className="bg-white rounded-2xl shadow-2xl p-6 border-2 border-amber-100">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold text-stone-800 flex items-center gap-2">
                      <Edit3 size={24} className="text-amber-600" />
                      Grundriss zeichnen
                    </h2>
                    <button className="px-4 py-2 bg-stone-100 rounded-lg hover:bg-stone-200 transition-colors">
                      <Download size={18} />
                    </button>
                  </div>
                  
                  <div 
                    ref={canvasRef}
                    onClick={handleCanvasClick}
                    className="relative bg-stone-50 rounded-xl overflow-hidden border-2 border-dashed border-stone-300"
                    style={{ height: '500px', cursor: draggedFurniture ? 'crosshair' : 'default' }}
                  >
                    <div className="absolute inset-0" style={{
                      backgroundImage: 'linear-gradient(#e5e5e5 1px, transparent 1px), linear-gradient(90deg, #e5e5e5 1px, transparent 1px)',
                      backgroundSize: '20px 20px'
                    }} />

                    {rooms.map((room) => (
                      <motion.div
                        key={room.id}
                        drag
                        dragMomentum={false}
                        whileHover={{ scale: 1.02 }}
                        style={{
                          position: 'absolute',
                          left: room.x,
                          top: room.y,
                          width: room.width,
                          height: room.height,
                          background: room.color,
                          border: selectedRoom === room.id ? '3px solid #d97706' : '2px solid #78716c',
                          borderRadius: '8px',
                          cursor: 'move',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 'bold',
                          color: '#292524',
                          fontSize: '18px',
                          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedRoom(room.id);
                        }}
                      >
                        {room.name}
                      </motion.div>
                    ))}

                    {furniture.map((item) => (
                      <motion.div
                        key={item.id}
                        drag
                        dragMomentum={false}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        style={{
                          position: 'absolute',
                          left: item.x - 15,
                          top: item.y - 15,
                          width: 30,
                          height: 30,
                          background: item.color,
                          borderRadius: '4px',
                          cursor: 'move',
                          boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                        }}
                      />
                    ))}
                  </div>
                  
                  <p className="text-sm text-stone-500 mt-4 italic">
                    💡 Tipp: Räume ziehen zum Verschieben. Möbel wählen und auf Canvas klicken.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl shadow-xl p-6 border-2 border-amber-200">
                  <h3 className="text-xl font-bold text-stone-800 mb-4 flex items-center gap-2">
                    <Maximize2 size={20} className="text-amber-600" />
                    Raum-Eigenschaften
                  </h3>
                  
                  {selectedRoom ? (
                    <div className="space-y-3">
                      <input
                        type="text"
                        value={rooms.find(r => r.id === selectedRoom)?.name || ''}
                        onChange={(e) => {
                          setRooms(rooms.map(r => 
                            r.id === selectedRoom ? {...r, name: e.target.value} : r
                          ));
                        }}
                        className="w-full px-4 py-2 border-2 border-amber-300 rounded-lg focus:outline-none focus:border-amber-500"
                        placeholder="Raumname"
                      />
                      <button 
                        onClick={() => {
                          setRooms(rooms.filter(r => r.id !== selectedRoom));
                          setSelectedRoom(null);
                        }}
                        className="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                      >
                        Raum löschen
                      </button>
                    </div>
                  ) : (
                    <p className="text-stone-600 italic">Wähle einen Raum aus</p>
                  )}
                  
                  <button
                    onClick={() => {
                      setRooms([...rooms, {
                        id: Date.now(),
                        name: 'Neuer Raum',
                        x: 50,
                        y: 220,
                        width: 120,
                        height: 120,
                        color: '#d4c5b0'
                      }]);
                    }}
                    className="w-full mt-4 px-4 py-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-lg hover:from-amber-700 hover:to-orange-700 transition-all font-semibold shadow-lg"
                  >
                    + Neuer Raum
                  </button>
                </div>

                <div className="bg-white rounded-2xl shadow-xl p-6 border-2 border-stone-200">
                  <h3 className="text-lg font-bold text-stone-800 mb-3">Projekt-Info</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-stone-600">Räume:</span>
                      <span className="font-bold text-amber-700">{rooms.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-600">Möbel:</span>
                      <span className="font-bold text-amber-700">{furniture.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-600">Status:</span>
                      <span className="font-bold text-green-600">Entwurf</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === '3d' && (
            <motion.div
              key="3d"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-gradient-to-br from-stone-900 to-amber-950 rounded-2xl shadow-2xl overflow-hidden"
              style={{ height: '700px' }}
            >
              <div className="p-6 bg-gradient-to-r from-stone-800 to-amber-900 border-b border-amber-700">
                <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                  <Eye size={28} className="text-amber-400" />
                  3D Vorschau Ihres Traumhauses
                </h2>
                <p className="text-amber-200 mt-1">Interaktiv: Drehen, Zoomen, Erkunden</p>
              </div>
              <div style={{ height: 'calc(100% - 100px)' }}>
                <Scene3D rooms={rooms} furniture={furniture} />
              </div>
            </motion.div>
          )}

          {activeTab === 'furniture' && (
            <motion.div
              key="furniture"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="bg-white rounded-2xl shadow-2xl p-8 border-2 border-amber-100">
                <h2 className="text-3xl font-bold text-stone-800 mb-6 flex items-center gap-3">
                  <Package size={28} className="text-amber-600" />
                  Möbel-Katalog
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {furnitureItems.map((item) => (
                    <motion.div
                      key={item.id}
                      whileHover={{ scale: 1.05, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setDraggedFurniture(item)}
                      className={`bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6 cursor-pointer border-2 transition-all ${
                        draggedFurniture?.id === item.id 
                          ? 'border-amber-600 shadow-2xl' 
                          : 'border-amber-200 hover:border-amber-400'
                      }`}
                    >
                      <div className="flex flex-col items-center text-center">
                        <div className="bg-amber-600 p-4 rounded-full mb-4">
                          <item.icon size={32} className="text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-stone-800 mb-2">{item.name}</h3>
                        <p className="text-sm text-stone-600 mb-3">{item.affiliate}</p>
                        <p className="text-2xl font-bold text-amber-700 mb-2">{item.price}</p>
                        <p className="text-xs text-green-700 font-semibold bg-green-100 px-2 py-1 rounded mb-4">
                          💰 Provision: {item.commission}
                        </p>
                        <button className="w-full px-4 py-2 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-lg hover:from-amber-700 hover:to-orange-700 transition-all font-semibold">
                          Bei IKEA kaufen →
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {draggedFurniture && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 p-4 bg-amber-100 border-2 border-amber-600 rounded-lg text-center"
                  >
                    <p className="text-amber-900 font-semibold">
                      ✨ <strong>{draggedFurniture.name}</strong> ausgewählt! Klicke im 2D Editor.
                    </p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}

          {activeTab === 'kitchen' && (
            <motion.div
              key="kitchen"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-orange-600 via-red-600 to-orange-600 rounded-2xl p-8 mb-8 text-white shadow-2xl relative overflow-hidden"
              >
                <div className="absolute inset-0 opacity-20">
                  <Sparkles className="absolute top-4 right-4 animate-pulse" size={40} />
                  <Sparkles className="absolute bottom-4 left-4 animate-pulse" size={30} />
                </div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-3">
                    <ChefHat size={40} />
                    <h2 className="text-4xl font-bold">Premium Küchen-Planung</h2>
                  </div>
                  <p className="text-xl mb-4">Ihre Traumküche mit bis zu €3.750 Provision pro Vermittlung!</p>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <span className="bg-white/20 px-4 py-2 rounded-full backdrop-blur">✨ Kostenlose Beratung</span>
                    <span className="bg-white/20 px-4 py-2 rounded-full backdrop-blur">📐 Professionelles Aufmaß</span>
                    <span className="bg-white/20 px-4 py-2 rounded-full backdrop-blur">🎨 3D-Visualisierung</span>
                  </div>
                </div>
              </motion.div>

              <div className="bg-white rounded-2xl shadow-2xl p-8 border-2 border-orange-100 mb-8">
                <h3 className="text-3xl font-bold text-stone-800 mb-6 flex items-center gap-3">
                  <UtensilsCrossed size={28} className="text-orange-600" />
                  Wählen Sie Ihren Küchen-Typ
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {kitchenLayouts.map((layout) => (
                    <motion.div
                      key={layout.id}
                      whileHover={{ scale: 1.05, y: -10 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedKitchenLayout(layout)}
                      className={`bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6 cursor-pointer border-3 transition-all ${
                        selectedKitchenLayout?.id === layout.id 
                          ? 'border-orange-600 shadow-2xl ring-4 ring-orange-200' 
                          : 'border-orange-200 hover:border-orange-400'
                      }`}
                    >
                      <div className="flex flex-col h-full">
                        <div className="bg-orange-600 p-3 rounded-full mb-4 w-fit">
                          <ChefHat size={24} className="text-white" />
                        </div>
                        <h4 className="text-xl font-bold text-stone-800 mb-2">{layout.name}</h4>
                        <p className="text-sm text-stone-600 mb-3 flex-grow">{layout.description}</p>
                        
                        <div className="space-y-2 mb-4">
                          {layout.features.map((feature, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-xs text-stone-700">
                              <ChevronRight size={14} className="text-orange-600" />
                              {feature}
                            </div>
                          ))}
                        </div>

                        <div className="border-t-2 border-orange-200 pt-4 mt-auto">
                          <p className="text-sm text-stone-600 mb-1">Ab</p>
                          <p className="text-3xl font-bold text-orange-700 mb-2">{layout.price}</p>
                          <p className="text-xs text-green-700 font-semibold bg-green-100 px-2 py-1 rounded">
                            💰 Provision: {layout.commission}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {selectedKitchenLayout && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-8 p-6 bg-gradient-to-r from-orange-100 to-red-100 border-2 border-orange-600 rounded-xl"
                  >
                    <div className="flex items-start gap-4">
                      <div className="bg-orange-600 p-3 rounded-full">
                        <Sparkles className="text-white" size={24} />
                      </div>
                      <div className="flex-grow">
                        <h4 className="text-xl font-bold text-stone-800 mb-2">
                          {selectedKitchenLayout.name} ausgewählt!
                        </h4>
                        <p className="text-stone-700 mb-3">
                          Partner: <strong>{selectedKitchenLayout.partner}</strong> | 
                          Preis: <strong>{selectedKitchenLayout.price}</strong>
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              <div className="bg-white rounded-2xl shadow-2xl p-8 border-2 border-orange-100 mb-8">
                <h3 className="text-2xl font-bold text-stone-800 mb-6 flex items-center gap-3">
                  <Grid3x3 size={24} className="text-orange-600" />
                  Küchen-Elemente
                </h3>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {kitchenElementsLib.map((element) => (
                    <motion.div
                      key={element.id}
                      whileHover={{ scale: 1.1 }}
                      className="bg-gradient-to-br from-stone-50 to-stone-100 rounded-lg p-4 text-center cursor-pointer border-2 border-stone-200 hover:border-orange-400 transition-all"
                    >
                      <div className="flex justify-center mb-2">
                        <div className="bg-stone-800 p-3 rounded-full">
                          <element.icon size={24} style={{ color: element.color }} />
                        </div>
                      </div>
                      <p className="font-bold text-stone-800 text-sm mb-1">{element.name}</p>
                      <p className="text-xs text-stone-600">{element.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="max-w-3xl mx-auto">
                <div className="bg-gradient-to-br from-white to-orange-50 rounded-2xl shadow-2xl p-10 border-2 border-orange-200">
                  <div className="text-center mb-8">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", duration: 0.5 }}
                      className="inline-block bg-gradient-to-r from-orange-600 to-red-600 p-4 rounded-full mb-4"
                    >
                      <ChefHat size={40} className="text-white" />
                    </motion.div>
                    <h2 className="text-4xl font-bold text-stone-800 mb-3">
                      Kostenlose Küchen-Beratung
                    </h2>
                    <p className="text-lg text-stone-600">
                      Inkl. Aufmaß und 3D-Visualisierung
                    </p>
                  </div>

                  <form onSubmit={handleKitchenSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-stone-700 mb-2">Ihr Name *</label>
                        <input
                          type="text"
                          required
                          value={kitchenFormData.name}
                          onChange={(e) => setKitchenFormData({...kitchenFormData, name: e.target.value})}
                          className="w-full px-4 py-3 border-2 border-orange-200 rounded-lg focus:outline-none focus:border-orange-500"
                          placeholder="Max Mustermann"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-stone-700 mb-2">E-Mail *</label>
                        <input
                          type="email"
                          required
                          value={kitchenFormData.email}
                          onChange={(e) => setKitchenFormData({...kitchenFormData, email: e.target.value})}
                          className="w-full px-4 py-3 border-2 border-orange-200 rounded-lg focus:outline-none focus:border-orange-500"
                          placeholder="max@beispiel.de"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-stone-700 mb-2">Telefon *</label>
                        <input
                          type="tel"
                          required
                          value={kitchenFormData.phone}
                          onChange={(e) => setKitchenFormData({...kitchenFormData, phone: e.target.value})}
                          className="w-full px-4 py-3 border-2 border-orange-200 rounded-lg focus:outline-none focus:border-orange-500"
                          placeholder="+49 123 456789"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-stone-700 mb-2">Region *</label>
                        <input
                          type="text"
                          required
                          value={kitchenFormData.region}
                          onChange={(e) => setKitchenFormData({...kitchenFormData, region: e.target.value})}
                          className="w-full px-4 py-3 border-2 border-orange-200 rounded-lg focus:outline-none focus:border-orange-500"
                          placeholder="z.B. München"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-stone-700 mb-2">Küchen-Typ *</label>
                      <select
                        required
                        value={kitchenFormData.layout}
                        onChange={(e) => setKitchenFormData({...kitchenFormData, layout: e.target.value})}
                        className="w-full px-4 py-3 border-2 border-orange-200 rounded-lg focus:outline-none focus:border-orange-500"
                      >
                        <option value="">Bitte wählen...</option>
                        {kitchenLayouts.map(layout => (
                          <option key={layout.id} value={layout.id}>{layout.name} (ab {layout.price})</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-stone-700 mb-2">Budget *</label>
                      <select
                        required
                        value={kitchenFormData.budget}
                        onChange={(e) => setKitchenFormData({...kitchenFormData, budget: e.target.value})}
                        className="w-full px-4 py-3 border-2 border-orange-200 rounded-lg focus:outline-none focus:border-orange-500"
                      >
                        <option value="">Bitte wählen...</option>
                        <option value="bis-10k">Bis €10.000</option>
                        <option value="10-20k">€10.000 - €20.000</option>
                        <option value="20-30k">€20.000 - €30.000</option>
                        <option value="über-30k">Über €30.000</option>
                      </select>
                    </div>

                    <div className="bg-orange-50 border-2 border-orange-200 rounded-lg p-6">
                      <h3 className="font-bold text-stone-800 mb-3 flex items-center gap-2">
                        <Sparkles className="text-orange-600" />
                        Ihre Premium-Vorteile:
                      </h3>
                      <ul className="space-y-2 text-sm text-stone-700">
                        <li>✅ Kostenlose Beratung</li>
                        <li>✅ Professionelles Aufmaß</li>
                        <li>✅ 3D-Visualisierung</li>
                        <li>✅ Angebote von Premium-Partnern</li>
                      </ul>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="w-full px-8 py-4 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-xl hover:from-orange-700 hover:to-red-700 font-bold text-lg shadow-xl flex items-center justify-center gap-3"
                    >
                      <ChefHat size={24} />
                      Jetzt kostenlos anfragen
                    </motion.button>

                    <p className="text-xs text-stone-500 text-center italic">
                      Mit dem Absenden stimmen Sie unserer Datenschutzerklärung zu.
                    </p>
                  </form>
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="mt-8 text-center"
                >
                  <p className="text-sm text-stone-600 mb-4">Unsere Küchen-Partner:</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {kitchenLayouts.map(layout => (
                      <div key={layout.id} className="bg-white px-6 py-3 rounded-lg shadow-md border border-stone-200">
                        <p className="font-bold text-stone-800">{layout.partner}</p>
                        <p className="text-xs text-green-600">{layout.commission}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}

          {activeTab === 'bautraeger' && (
            <motion.div
              key="bautraeger"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-3xl mx-auto"
            >
              <div className="bg-gradient-to-br from-white to-amber-50 rounded-2xl shadow-2xl p-10 border-2 border-amber-200">
                <div className="text-center mb-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", duration: 0.5 }}
                    className="inline-block bg-gradient-to-r from-amber-600 to-orange-600 p-4 rounded-full mb-4"
                  >
                    <Send size={40} className="text-white" />
                  </motion.div>
                  <h2 className="text-4xl font-bold text-stone-800 mb-3">
                    Wer baut mir mein Traumhaus?
                  </h2>
                  <p className="text-lg text-stone-600">
                    Kostenlose Vermittlung zu geprüften Bauträgern
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-stone-700 mb-2">Ihr Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg focus:outline-none focus:border-amber-500"
                        placeholder="Max Mustermann"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-stone-700 mb-2">E-Mail *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg focus:outline-none focus:border-amber-500"
                        placeholder="max@beispiel.de"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-stone-700 mb-2">Telefon *</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg focus:outline-none focus:border-amber-500"
                        placeholder="+49 123 456789"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-stone-700 mb-2">Region *</label>
                      <input
                        type="text"
                        required
                        value={formData.region}
                        onChange={(e) => setFormData({...formData, region: e.target.value})}
                        className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg focus:outline-none focus:border-amber-500"
                        placeholder="z.B. München"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-stone-700 mb-2">Budget *</label>
                    <select
                      required
                      value={formData.budget}
                      onChange={(e) => setFormData({...formData, budget: e.target.value})}
                      className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg focus:outline-none focus:border-amber-500"
                    >
                      <option value="">Bitte wählen...</option>
                      <option value="bis-300k">Bis €300.000</option>
                      <option value="300-500k">€300.000 - €500.000</option>
                      <option value="500-750k">€500.000 - €750.000</option>
                      <option value="über-750k">Über €750.000</option>
                    </select>
                  </div>

                  <div className="bg-amber-50 border-2 border-amber-200 rounded-lg p-6">
                    <h3 className="font-bold text-stone-800 mb-2 flex items-center gap-2">
                      <ChevronRight className="text-amber-600" />
                      Ihre Vorteile:
                    </h3>
                    <ul className="space-y-2 text-sm text-stone-700">
                      <li>✅ Kostenloser Service</li>
                      <li>✅ Geprüfte Bauträger</li>
                      <li>✅ 3D-Grundriss inklusive</li>
                      <li>✅ Angebote in 48h</li>
                    </ul>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full px-8 py-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-xl hover:from-amber-700 hover:to-orange-700 font-bold text-lg shadow-xl flex items-center justify-center gap-3"
                  >
                    <Send size={24} />
                    Jetzt Angebote erhalten
                  </motion.button>

                  <p className="text-xs text-stone-500 text-center italic">
                    Mit dem Absenden stimmen Sie unserer Datenschutzerklärung zu.
                  </p>
                </form>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-8 text-center"
              >
                <p className="text-sm text-stone-600 mb-4">Unsere Partner:</p>
                <div className="flex justify-center gap-8">
                  <div className="bg-white px-6 py-3 rounded-lg shadow-md border border-stone-200">
                    <p className="font-bold text-stone-800">WITO Haus</p>
                  </div>
                  <div className="bg-white px-6 py-3 rounded-lg shadow-md border border-stone-200">
                    <p className="font-bold text-stone-800">Musterhaus.net</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-300 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-lg mb-4">
            <strong className="text-amber-400">GrundrissRatgeber.de</strong> - Ihr Partner für digitale Hausplanung
          </p>
          <p className="text-sm text-stone-400 mb-2">
            © 2026 GrundrissRatgeber.de | Prototyp v2.0 | Alle Rechte vorbehalten
          </p>
          <p className="text-xs text-orange-400 font-semibold">
            🆕 NEU: Premium Küchen-Planung mit bis zu €3.750 Provision!
          </p>
          <div className="mt-6 flex justify-center gap-6 text-sm">
            <a href="#" className="hover:text-amber-400 transition-colors">Datenschutz</a>
            <a href="#" className="hover:text-amber-400 transition-colors">Impressum</a>
            <a href="#" className="hover:text-amber-400 transition-colors">AGB</a>
            <a href="#" className="hover:text-amber-400 transition-colors">Kontakt</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
