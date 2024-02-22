import React, { useState, useEffect } from 'react';
import './App.css';
import img1 from './assets/001.png';
import img2 from './assets/002.png';
import img3 from './assets/003.png';
import img4 from './assets/004.png';
import img5 from './assets/005.png';
import img6 from './assets/006.png';
import img7 from './assets/007.png';
import img8 from './assets/008.png';

const predefinedModules = [
  { id: 'img1', src: img1 },
  { id: 'img2', src: img2 },
  { id: 'img3', src: img3 },
  { id: 'img4', src: img4 },
  { id: 'img5', src: img5 },
  { id: 'img6', src: img6 },
  { id: 'img7', src: img7 },
  { id: 'img8', src: img8 }
];

function App() {
  const [imageOrder, setImageOrder] = useState(predefinedModules.map(module => module.id));

  useEffect(() => {
    const savedImageOrder = JSON.parse(localStorage.getItem('imageOrder'));
    if (savedImageOrder) {
      setImageOrder(savedImageOrder);
    } else {
      setImageOrder(predefinedModules.map(module => module.id));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('imageOrder', JSON.stringify(imageOrder));
  }, [imageOrder]);

  const handleDragStart = (e, id) => {
    e.dataTransfer.setData('text/plain', id);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetIndex) => {
    e.preventDefault();
    const droppedItemId = e.dataTransfer.getData('text/plain');
    const draggedItemIndex = imageOrder.findIndex(id => id === droppedItemId);
    
    if (draggedItemIndex !== -1) {
      const newImageOrder = [...imageOrder];
      newImageOrder.splice(draggedItemIndex, 1);
      newImageOrder.splice(targetIndex, 0, droppedItemId);
      setImageOrder(newImageOrder);
    }
  };

  return (
    <div className='h-screen flex flex-col justify-between'>
      <div className='w-full' onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, 0)}>
        <img
          src={getImageSource(imageOrder[0])}
          alt='img1'
          className='w-full'
          draggable
          onDragStart={(e) => handleDragStart(e, imageOrder[0])}
        />
      </div>
      <div className='flex flex-wrap'>
        {imageOrder.slice(1, 7).map((id, index) => (
          <div key={id} className="w-full md:w-1/2 p-2" onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, index + 1)}>
            <img
              src={getImageSource(id)}
              alt={`img${index + 2}`}
              draggable
              className='object-cover w-full h-full'
              onDragStart={(e) => handleDragStart(e, id)}
            />
          </div>
        ))}
      </div>
      <div className='w-full' onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, 7)}>
        <img
          src={getImageSource(imageOrder[7])}
          alt='img8'
          className='w-full'
          draggable
          onDragStart={(e) => handleDragStart(e, imageOrder[7])}
        />
      </div>
    </div>
  );
}

function getImageSource(id) {
  switch (id) {
    case 'img1':
      return img1;
    case 'img2':
      return img2;
    case 'img3':
      return img3;
    case 'img4':
      return img4;
    case 'img5':
      return img5;
    case 'img6':
      return img6;
    case 'img7':
      return img7;
    case 'img8':
      return img8;
    default:
      return '';
  }
}

export default App;
