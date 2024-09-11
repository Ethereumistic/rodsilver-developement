import React from 'react';
import { useStateContext } from '@/context/StateContext';
import Cart from './Cart';

const CartWrapper: React.FC = () => {
  const { showCart } = useStateContext();

  return (
    <div className="fixed inset-y-0 right-0 z-[5001]">
      {showCart && <Cart />}
    </div>
  );
};

export default CartWrapper;