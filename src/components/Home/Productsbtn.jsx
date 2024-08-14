import React from "react";
import { Link } from "react-router-dom";
import { productsgroups } from "../../data/constants"; 

function Productsbtn() {
  return (
    <div className="text-center flex flex-wrap justify-center gap-4 p-5 ">
      {productsgroups.map((product, index) => (
        <div
          key={index}
          data-aos="zoom-in"
          data-aos-delay={product.aosDelay}
          className="flex items-center gap-4 border-2 border-slate-400 rounded-full p-4 font-semibold hover:text-slate-100 hover:bg-primary duration-300 w-full sm:w-1/2 md:w-1/3 lg:w-auto "
        >
          <img
            src="../images/icons/rightIcon.png"
            alt=""
            className="w-6 sm:w-8 md:w-10 lg:w-12"
          />
          <Link
            to={product.link}
            className="text-sm sm:text-base md:text-lg lg:text-xl"
          >
            {product.name}
          </Link>
        </div>
      ))}
    </div>
  );
}

export default Productsbtn;
