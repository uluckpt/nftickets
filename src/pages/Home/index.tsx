//eslint-disable-next-line   @typescript-eslint/no-unused-vars
import React  from 'react';

// eslint-disable-next-line  @typescript-eslint/explicit-module-boundary-types
const Home = () => {

  
  return (

    <div className='d-flex flex-fill align-items-center container '>
      <div className='row align-items-center'>
        <div className='col  align-self-center'>
        <img className="  img-fluid" src="./logo_son.png" ></img>
          <h2 className="text-center mt-2" >{' NFT / SFT Tickets issued on elrond network '}</h2>
          <img className="  img-fluid" src="./home2.png" ></img>
          <h3 className="text-center b">{" BUY NFTickets to enter Lotteries"}</h3>
        </div>
        <div className='col align-self-center'>
          <img className="img-fluid " src="./lotto_home.png" ></img>
        </div>
      </div>
    </div>
   
  );
};

export default Home;
