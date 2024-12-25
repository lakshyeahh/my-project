'use client'

import { useState } from 'react'
import { ChevronLeft, Plus, Edit2, Trash2, X } from 'lucide-react'
import { Link } from 'react-router-dom'

// Mock data for initial photos
const initialPhotos = [
  { id: 1, src: '/placeholder.svg?height=300&width=300', caption: 'Our first date' },
  { id: 2, src: '/placeholder.svg?height=300&width=300', caption: 'Summer vacation' },
  { id: 3, src: '/placeholder.svg?height=300&width=300', caption: 'Anniversary dinner' },
  { id: 4, src: '/placeholder.svg?height=300&width=300', caption: 'Cozy movie night' },
]

interface Photo {
  id: number;
  src: string;
  caption: string;
}

const PhotoThumbnail = ({ photo, onClick }: { 
  photo: Photo; 
  onClick: (photo: Photo) => void 
}) => (
  <div 
    className="relative aspect-square overflow-hidden rounded-lg border-4 border-pink-200 cursor-pointer transform transition-transform hover:scale-105"
    onClick={() => onClick(photo)}
  >
    <img
      src={photo.src}
      alt={photo.caption}
      className="w-full h-full object-cover"
    />
  </div>
)

const FullScreenPhoto = ({ 
  photo, 
  onClose, 
  onEdit, 
  onDelete, 
  onNext, 
  onPrevious 
}: { 
  photo: Photo; 
  onClose: () => void;
  onEdit: (photo: Photo) => void;
  onDelete: (id: number) => void;
  onNext: () => void;
  onPrevious: () => void;
}) => (
  <div className="fixed inset-0 bg-black bg-opacity-90 flex flex-col justify-center items-center z-50">
    <button onClick={onClose} className="absolute top-4 right-4 text-white">
      <X size={24} />
    </button>
    <div className="relative w-full h-[calc(100%-100px)]">
      <img
        src={photo.src}
        alt={photo.caption}
        className="w-full h-full object-contain"
      />
    </div>
    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
      <p className="text-white text-center font-medium text-lg mb-2">{photo.caption}</p>
      <div className="flex justify-center space-x-4">
        <button onClick={onPrevious} className="text-white px-4 py-2 rounded-full bg-pink-500 hover:bg-pink-600 transition-colors">
          Previous
        </button>
        <button onClick={() => onEdit(photo)} className="text-white px-4 py-2 rounded-full bg-blue-500 hover:bg-blue-600 transition-colors">
          <Edit2 size={16} className="inline mr-1" /> Edit Caption
        </button>
        <button onClick={() => onDelete(photo.id)} className="text-white px-4 py-2 rounded-full bg-red-500 hover:bg-red-600 transition-colors">
          <Trash2 size={16} className="inline mr-1" /> Delete
        </button>
        <button onClick={onNext} className="text-white px-4 py-2 rounded-full bg-pink-500 hover:bg-pink-600 transition-colors">
          Next
        </button>
      </div>
    </div>
  </div>
)

export default function PhotoGallery() {
  const [photos, setPhotos] = useState(initialPhotos)
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null)
  const [editingCaption, setEditingCaption] = useState(false)
  const [newCaption, setNewCaption] = useState('')

  const handlePhotoClick = (photo: Photo) => {
    setSelectedPhoto(photo)
  }

  const handleCloseFullScreen = () => {
    setSelectedPhoto(null)
    setEditingCaption(false)
  }

  const handleEditCaption = (photo: Photo) => {
    setEditingCaption(true)
    setNewCaption(photo.caption)
  }

  const handleSaveCaption = () => {
    if (selectedPhoto) {
      setPhotos(photos.map(p => 
        p.id === selectedPhoto.id ? { ...p, caption: newCaption } : p
      ))
      setSelectedPhoto({ ...selectedPhoto, caption: newCaption })
    }
    setEditingCaption(false)
  }

  const handleDeletePhoto = (id: number) => {
    setPhotos(photos.filter(p => p.id !== id))
    setSelectedPhoto(null)
  }

  const handleNextPhoto = () => {
    if (selectedPhoto) {
      const currentIndex = photos.findIndex(p => p.id === selectedPhoto.id)
      const nextIndex = (currentIndex + 1) % photos.length
      setSelectedPhoto(photos[nextIndex])
    }
  }

  const handlePreviousPhoto = () => {
    if (selectedPhoto) {
      const currentIndex = photos.findIndex(p => p.id === selectedPhoto.id)
      const previousIndex = (currentIndex - 1 + photos.length) % photos.length
      setSelectedPhoto(photos[previousIndex])
    }
  }

  const handleAddPhoto = () => {
    // In a real app, this would open a file picker and upload the image
    const newPhoto = {
      id: Date.now(),
      src: '/placeholder.svg?height=300&width=300',
      caption: 'New memory'
    }
    setPhotos([...photos, newPhoto])
  }

  return (
    <div className="max-w-md mx-auto bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 min-h-screen p-6">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="mr-4">
            <ChevronLeft className="w-6 h-6 text-pink-800" />
          </Link>
          <h1 className="text-2xl font-bold text-pink-800">Photo Memories</h1>
        </div>
        <button
          onClick={handleAddPhoto}
          className="bg-pink-500 text-white p-3 rounded-full hover:bg-pink-600 transition-colors shadow-lg"
        >
          <Plus size={24} />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {photos.map(photo => (
          <PhotoThumbnail key={photo.id} photo={photo} onClick={handlePhotoClick} />
        ))}
      </div>

      {selectedPhoto && (
        <FullScreenPhoto
          photo={selectedPhoto}
          onClose={handleCloseFullScreen}
          onEdit={handleEditCaption}
          onDelete={handleDeletePhoto}
          onNext={handleNextPhoto}
          onPrevious={handlePreviousPhoto}
        />
      )}

      {editingCaption && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-80">
            <h2 className="text-xl font-bold mb-4">Edit Caption</h2>
            <input
              type="text"
              value={newCaption}
              onChange={(e) => setNewCaption(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setEditingCaption(false)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveCaption}
                className="px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600 transition-colors"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}