import type { NextPage } from "next";
import { Warpper } from "../layout";
import { Carousel } from "react-responsive-carousel";
import { CubeIcon } from "@heroicons/react/24/outline";

const AboutUs: NextPage = () => {
  return (
    <Warpper>
      <div className="columns-1 p-4" dir="rtl">
        <div className="w-full">
          <h3 className="text-2xl">معرفی خدمات شرکت دنا نوا</h3>
          <p className="text-justify mt-2 opacity-80">
            شرکت دنا نوا آزما با پشتوانه علمی در زمینه ی بیوتکنولوژی،
            میکروبیولوژی، شیمی و بیوشیمی آمادگی خود را جهت ارائه خدمات زیر اعلام
            میدارد.
          </p>
          <h3 className="mt-5 text-2xl">حوزه های فعالیت</h3>
          <ul className=" mr-4 mt-2 opacity-80">
            <li className="flex items-center">
              <CubeIcon className="w-4 inline" />
              <span>مشاوره علمی :</span>
            </li>
            <li>
              <ul className=" mr-6 list-disc">
                <li>تشخیص آلودگی های میکروبی در خط تولید صنایع</li>
                <li>بهینه سازی محیط کشت فراوزده های بیوتکنولوژی</li>
              </ul>
            </li>
            <li className="flex items-center">
              <CubeIcon className="w-4 inline" />
              <span>مشاوره آماری در طراحی آزمایش به روش سطح پاسخ</span>
            </li>
            <li className="flex items-start">
              <CubeIcon className="w-4 inline pt-1" />
              <span>
                مشاوره بیوانفورماتیک (در زمینه طراحی پرایمر، رسم درخت
                فیلوژنی،شبیه سازی مولکولی، طراحی واکسن)
              </span>
            </li>
            <li className="flex items-start">
              <CubeIcon className="w-4 inline pt-1" />
              <span>
                تفسیر و آنالیز نتایج طیف های NMR، IR، SEM، XRD، EDAX، Mass
              </span>
            </li>
            <li className="flex items-center">
              <CubeIcon className="w-4 inline" />
              <span>
                مشاوره و راه اندازی فرآیندهای تخمیری در فرمانتور (بیوراکتور)
              </span>
            </li>
            <li className="flex items-center">
              <CubeIcon className="w-4 inline" />
              <span>مشاوره در زمینه خالص سازی پروتئین</span>
            </li>
            <li className="flex items-start">
              <CubeIcon className="w-4 inline pt-1" />
              <span>
                مشاوره در زمینه آزمایش های سرولوژی (الایزا، وسترن بلات، و دات
                بلات)
              </span>
            </li>
            <li className="flex items-start">
              <CubeIcon className="w-4 inline pt-1" />
              <span>
                مشاوره در زمینه آزمایشات مولکولی (PCR، کلونینگ، بیان ژن، و
                الکتروفورز)
              </span>
            </li>
            <li className="flex items-center">
              <CubeIcon className="w-4 inline" />
              <span>کالیبراسیون انواع سمپلر</span>
            </li>
          </ul>
        </div>
      </div>

      <Carousel
        showStatus={false}
        interval={3000}
        infiniteLoop
        autoPlay
        className="mt-6"
      >
        <div className="md:h-ft h-72">
          <img src="/sliderSerIMG1.jpg" className="h-full" />
        </div>
        <div className="md:h-ft h-72">
          <img src="/sliderSerIMG2.jpg" className="h-full" />
        </div>

        <div className="md:h-ft h-72">
          <img src="/sliderSerIMG3.jpg" className="h-full" />
        </div>
        <div className="md:h-ft h-72">
          <img src="/ferdowsiUni1.jpg" className="h-full" />
        </div>
        <div className="md:h-ft h-72">
          <img src="/ferdowsiUni2.jpg" className="h-full" />
        </div>
        <div className="md:h-ft h-72">
          <img src="/ferdowsiUni3.jpg" className="h-full" />
        </div>
      </Carousel>
    </Warpper>
  );
};

export default AboutUs;
