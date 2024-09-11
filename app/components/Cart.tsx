import React, { useRef } from 'react';
import Link from 'next/link';
import { IconMinus, IconPlus, IconShoppingCart, IconArrowLeft, IconTrash } from '@tabler/icons-react'
import toast from 'react-hot-toast';
import Image from 'next/image';
import { useStateContext } from '@/context/StateContext';
import { urlFor } from '@/sanity/lib/client';
import getStripe from '@/lib/getStripe';
import { ProductType } from '@/types/product';

interface CartItem extends ProductType {
  quantity: number;
}


const Cart: React.FC = () => {
  const cartRef = useRef<HTMLDivElement>(null);
  const { totalPrice, totalQuantities, cartItems, setShowCart, toggleCartItemQuanitity, onRemove } = useStateContext();

  const handleCheckout = async () => {
    try {
      const stripe = await getStripe();
      if (!stripe) {
        throw new Error('Failed to load Stripe');
      }
  
      const response = await fetch('/api/stripe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cartItems),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Server error');
      }
  
      const data = await response.json();
  
      toast.loading('Redirecting...');
  
      const result = await stripe.redirectToCheckout({ sessionId: data.id });
  
      if (result.error) {
        throw new Error(result.error.message || 'Checkout error');
      }
    } catch (error) {
      console.error('Error in handleCheckout:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to initiate checkout');
    }
  };

  return (
    <div className=" bg-black/[0.5] float-right px-10 py-3" ref={cartRef}>
      <div className="h-screen  w-[600px] bg-lgreen/[0.5] relative">
        <button
        type="button"
        className="cart-heading"
        onClick={() => setShowCart(false)}>
          <IconArrowLeft />
          <span className="heading">Твоята количка</span>
          <span className="cart-num-items">({totalQuantities} продукта)</span>
        </button>

        {cartItems.length < 1 && (
          <div className="empty-cart">
            <IconShoppingCart size={150} />
            <h3>Your shopping bag is empty</h3>
            <Link href="/">
              <button
                type="button"
                onClick={() => setShowCart(false)}
                className="btn"
              >
                Continue Shopping
              </button>
            </Link>
          </div>
        )}

<div className="bg-ddblue grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
{cartItems.length >= 1 && cartItems.map((item: CartItem) => (
            <div className="product" key={item._id}>
              <Image src={urlFor(item?.image[0]).url()} alt={item.name} width={150} height={150} className="w-[150px] h-[150px] object-cover rounded-xl" />
              <div className="item-desc">
                <div className="flex top">
                  <h5>{item.name}</h5>
                  <h4>${item.price}</h4>
                </div>
                <div className="flex bottom">
                  <div>
                  <p className="quantity-desc">
                    <span className="minus" onClick={() => toggleCartItemQuanitity(item._id, 'dec') }>
                    <IconMinus />
                    </span>
                    <span className="num">{item.quantity}</span>
                    <span className="plus" onClick={() => toggleCartItemQuanitity(item._id, 'inc') }><IconPlus /></span>
                  </p>
                  </div>
                  <button
                    type="button"
                    className="remove-item"
                    onClick={() => onRemove(item)}
                  >
                    <IconTrash />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {cartItems.length >= 1 && (
          <div className="absolute bottom-3 right-1 w-full py-16 px-8 text-center">
            <div className="font-bold text-2xl">
              <h3 >Обща Стойност:</h3>
              <h3>${totalPrice}</h3>
            </div>
            <div className="btn-container">
              <button type="button" className="w-full max-w-[400px] px-3 py-2 rounded-[15px] border-none text-[20px] mt-10 uppercase bg-[#f02d34] text-white cursor-pointer transform transition-transform duration-500 hover:scale-100" onClick={handleCheckout}>
                Pay with Stripe
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart;