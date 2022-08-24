function ImagePopup({ card, onClose }) {
  return (
    <div className={`popup popup_fullsize ${card.name && 'popup_opened'}`}>
      <figure className='popup__figure'>
        <button
          className='popup__btn-close btn-opacity'
          type='button'
          onClick={onClose}
        />
        <img className='popup__full-photo' src={`${card.link}`} alt={`${card.name}`} />
        <figcaption className='popup__figcaption'>{card.name}</figcaption>
      </figure>
    </div>
  );
}

export default ImagePopup;
