import {FC} from 'react';

type PropsType = {classPic:string; altPic:string; srcPic:string};

const Pic: FC<PropsType> = ({classPic, altPic, srcPic}) => {
    return(
        <picture className={classPic}>
            <source srcSet={srcPic} type="image/webp" />
            <img src={srcPic} alt={altPic} />
        </picture>
    );
};


export default Pic;