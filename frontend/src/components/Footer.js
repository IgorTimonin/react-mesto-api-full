import { useState, useEffect } from 'react';

export default function Footer() {
  const [date, setDate] = useState();
  const getYear = () => setDate(new Date().getFullYear());

  useEffect(() => {
    getYear();
  }, []);
  return (
      <footer className='footer'>
        <p className='footer__copyright'>
          {date} &copy; Make with ❤️ by Igor Timonin
        </p>
      </footer>
  );
}
