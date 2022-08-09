import React, { useState, FC } from "react";
import type { NextPage } from "next";



type PropsType = { src: string; title: string };

const HomeCard: FC<PropsType> = ({ src, title }) => {


    const [a,setA] = useState<boolean>(false);
    
        
  return (
    <div>
      {a}
      <br/>
      <button
        onClick={() => {
            
          setA(!a);
        }}
        // type={a?"text":"password"}
      >
        convert to 23
      </button>
    </div>
  );
};

export default HomeCard;
