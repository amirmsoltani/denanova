import {FC} from 'react';

type PropsType = {classPic:string; altPic:string; srcPic:string};

const Pic: FC<PropsType> = ({classPic, altPic, srcPic}) => {
    return(
        <picture>
            <source srcSet={srcPic} type="image/webp" />
            <img  className={classPic+" object-contain"} src={srcPic} alt={altPic} />
        </picture>
    );
};


export default Pic;