import React from 'react';

const Card = ({ item, showActions, onAdd, onDiscard, action, isAlreadyInAlbum, showDetails }) => (
  <div
    className={`flex flex-col justify-center items-center card p-4 border rounded-lg shadow-md 
                transition-transform duration-300 ${showActions ? '' : item.name ? 'cursor-pointer hover:scale-125 hover:-translate-y-6' : 'opacity-50 cursor-not-allowed'} 
                ${item.name ? (item.special ? 'bg-starwars-primary' : 'bg-white') : 'bg-gray-200'}`}
    style={{ width: '200px', height: '200px', margin: '10px' }}
    onClick={!showActions && item.name ? showDetails : null}
  >
    <h3 className="text-lg font-bold">{item.name || `${item.id}`}</h3>
    {item.name && <p className="text-sm text-starwars-secondary">{item.id}</p>}
    {item.name && <p className="text-sm">{item.special ? 'Especial' : 'Regular'}</p>}
    {showActions && (
      <>
        {!isAlreadyInAlbum ? (
          <button
            onClick={() => onAdd(item)}
            className={`mt-2 px-4 py-2 rounded ${action === 'added' ? 'bg-starwars-buttonDisabled cursor-not-allowed' : 'bg-starwars-buttonSecondary hover:bg-blue-700 text-white'}`}
            disabled={action === 'added'}
          >
            Agregar al álbum
          </button>
        ) : (
          <button
            onClick={() => onDiscard(item)}
            className={`mt-2 px-4 py-2 rounded ${action === 'discarded' ? 'bg-starwars-buttonDisabled cursor-not-allowed' : 'bg-starwars-buttonPrimary hover:bg-red-700 text-white'}`}
            disabled={action === 'discarded'}
          >
            Descartar
          </button>
        )}
      </>
    )}
  </div>
);

export default Card;