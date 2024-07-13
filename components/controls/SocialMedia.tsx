import Link from 'next/link';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

export default function SocialMedia() {
  return (
    <div className="m-8 flex items-center justify-center">
      <div className="mr-4 hover:text-blue-400  cursor-pointer">
        <Link
          href="https://www.facebook.com/asiatips.net"
          target="_blank"
          aria-label="Facebook of asiatips"
        >
          <FaFacebook size={32} />
        </Link>
      </div>
      <div className="mr-4 hover:text-blue-600 cursor-pointer">
        <Link
          href="https://twitter.com/asiatips_net"
          target="_blank"
          aria-label="Twitter of asiatips"
        >
          <FaTwitter size={32} />
        </Link>
      </div>
      <div className="hover:text-red-600 cursor-pointer">
        <Link
          href="https://www.instagram.com/asiatips.official/"
          target="_blank"
          aria-label="Instagram of asiatips"
        >
          <FaInstagram size={32} />
        </Link>
      </div>
    </div>
  );
}
