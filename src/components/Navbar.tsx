import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '../hooks/use-cart';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';

const Navbar: React.FC = () => {
  const { itemCount } = useCart();
  const router = useRouter();

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <img 
                src="/images/assets/Asset 10FAIRBID.png" 
                alt="FAIRBID Logo" 
                className="h-8 w-auto"
              />
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link href="/" className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium">
              Home
            </Link>
            <Link href="/shop" className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium">
              Shop
            </Link>
            
            <div className="ml-4 flex items-center">
              <div className="relative">
                <button 
                  className="text-gray-700 hover:text-gray-900 p-2"
                  onClick={() => router.push('/cart')}
                  aria-label="Shopping Cart"
                >
                  <ShoppingCartIcon className="h-6 w-6" />
                </button>
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full min-w-5 h-5 flex items-center justify-center px-1">
                    {itemCount}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
