import React from "react";

const Testimonials = () => {
  return (
    <div>
      <div className="min-h-[100vh] w-full bg-white">
        <div className="w-full md:block /hidden">
          <div className="flex flex-col items-center justify-center">
            <h3
              className="text-center mt-[3rem] text-2xl font-semibold "
              style={{ fontFamily: "rubik" }}
            >
              Our Testimonials
            </h3>
            <div className="w-[09%] block h-[2px] rounded-full bg-[#083c83]" />
          </div>
          <div className="w-full flex gap-[1rem] px-[1rem] md:px-[5rem] lg:px-[10rem] mt-[3rem] flex-wrap  justify-center">
            <figure class="flex flex-col items-center justify-center rounded-xl w-[24rem] p-[1rem] text-center bg-slate-200 /bg-[#083c83] border-2 border-[rgba(0,0,0,0.05)] ">
              <blockquote class="max-w-2xl mx-auto /mb-4 text-gray-500 /lg:mb-8 ">
                <h3 class="text-lg font-semibold text-gray-900 ">
                  Ask To BizGPT
                </h3>
                <p class="my-4">{`"Speak to me about Company Formation"`}</p>
              </blockquote>
              <figcaption class="flex items-center justify-start  w-full space-x-3">
                <img
                  class="rounded-full w-9 h-9"
                  src="https://api.dicebear.com/6.x/avataaars/svg?seed=Robert"
                  alt="profile picture"
                />
                <div class="space-y-0.5 font-medium  text-left">
                  <div>Robert</div>
                  <div class="text-sm text-gray-500 dark:text-gray-400">
                    From USA
                  </div>
                </div>
              </figcaption>
            </figure>
            <figure class="flex flex-col items-center justify-center rounded-xl w-[24rem] p-[1rem] text-center bg-slate-200 /bg-[#083c83] border-2 border-[rgba(0,0,0,0.05)] ">
              <blockquote class="max-w-2xl mx-auto /mb-4 text-gray-500 /lg:mb-8 ">
                <h3 class="text-lg font-semibold text-gray-900 ">
                  попросить bizgpt
                </h3>
                <p class="my-4">{`"Поговори со мной о налогах"`}</p>
              </blockquote>
              <figcaption class="flex items-center justify-start  w-full space-x-3">
                <img
                  class="rounded-full w-9 h-9"
                  src="https://api.dicebear.com/6.x/avataaars/svg?seed=Nadia"
                  alt="profile picture"
                />
                <div class="space-y-0.5 font-medium  text-left">
                  <div>Nadia</div>
                  <div class="text-sm text-gray-500 dark:text-gray-400">
                    From Russia
                  </div>
                </div>
              </figcaption>
            </figure>
            <figure class="flex flex-col items-center justify-center rounded-xl w-[24rem] p-[1rem] text-center bg-slate-200 /bg-[#083c83] border-2 border-[rgba(0,0,0,0.05)] ">
              <blockquote class="max-w-2xl mx-auto /mb-4 text-gray-500 /lg:mb-8 ">
                <h3 class="text-lg font-semibold text-gray-900 ">询问bizgpt</h3>
                <p class="my-4">{`"跟我谈谈公司成立"`}</p>
              </blockquote>
              <figcaption class="flex items-center justify-start  w-full space-x-3">
                <img
                  class="rounded-full w-9 h-9"
                  src="https://api.dicebear.com/6.x/avataaars/svg?seed=Chang"
                  alt="profile picture"
                />
                <div class="space-y-0.5 font-medium  text-left">
                  <div>Chang</div>
                  <div class="text-sm text-gray-500 dark:text-gray-400">
                    From China
                  </div>
                </div>
              </figcaption>
            </figure>
          </div>
          <div className="w-full md:flex hidden  gap-[1rem]  px-[1rem] md:px-[5rem] lg:px-[10rem] mt-[3rem] flex-wrap justify-center">
            <figure class="flex flex-col items-center justify-center rounded-xl w-[24rem] p-[1rem] text-center bg-slate-200 /bg-[#083c83] border-2 border-[rgba(0,0,0,0.05)] ">
              <blockquote class="max-w-2xl mx-auto /mb-4 text-gray-500 /lg:mb-8 ">
                <h3 class="text-lg font-semibold text-gray-900 ">
                  اطلب بيزجبت
                </h3>
                <p class="my-4">{`"ما هي الأعمال التي تناسبني بشكل أفضل؟ البر الرئيسي أم المنطقة الحرة؟"`}</p>
              </blockquote>
              <figcaption class="flex items-center justify-start  w-full space-x-3">
                <img
                  class="rounded-full w-9 h-9"
                  src="https://api.dicebear.com/6.x/avataaars/svg?seed=Aabid1"
                  alt="profile picture"
                />
                <div class="space-y-0.5 font-medium  text-left">
                  <div>Aabid</div>
                  <div class="text-sm text-gray-500 dark:text-gray-400">
                    From Arab
                  </div>
                </div>
              </figcaption>
            </figure>
            <figure class="flex flex-col items-center justify-center rounded-xl w-[24rem] p-[1rem] text-center bg-slate-200 /bg-[#083c83] border-2 border-[rgba(0,0,0,0.05)] ">
              <blockquote class="max-w-2xl mx-auto /mb-4 text-gray-500 /lg:mb-8 ">
                <h3 class="text-lg font-semibold text-gray-900 ">
                  बिज़गप्ट से पूछें
                </h3>
                <p class="my-4">{`"क्या मुझे दुबई में कर का भुगतान करने की आवश्यकता है? और अगर ऐसा है, तो कितना है?"`}</p>
              </blockquote>
              <figcaption class="flex items-center justify-start  w-full space-x-3">
                <img
                  class="rounded-full w-9 h-9"
                  src="https://api.dicebear.com/6.x/pixel-art/svg?seed=aditya"
                  alt="profile picture"
                />
                <div class="space-y-0.5 font-medium  text-left">
                  <div>Aditya</div>
                  <div class="text-sm text-gray-500 dark:text-gray-400">
                    Developer From India
                  </div>
                </div>
              </figcaption>
            </figure>
            <figure class="flex flex-col items-center justify-center rounded-xl w-[24rem] p-[1rem] text-center bg-slate-200 /bg-[#083c83] border-2 border-[rgba(0,0,0,0.05)] ">
              <blockquote class="max-w-2xl mx-auto /mb-4 text-gray-500 /lg:mb-8 ">
                <h3 class="text-lg font-semibold text-gray-900 ">
                  bizgpt سے پوچھیں۔
                </h3>
                <p class="my-4">{`"میں اپنا ٹریڈ مارک کیسے رجسٹر کروں؟"`}</p>
              </blockquote>
              <figcaption class="flex items-center justify-start  w-full space-x-3">
                <img
                  class="rounded-full w-9 h-9"
                  src="https://api.dicebear.com/6.x/avataaars/svg?seed=ARIF"
                  alt="profile picture"
                />
                <div class="space-y-0.5 font-medium  text-left">
                  <div>ARIF</div>
                  <div class="text-sm text-gray-500 dark:text-gray-400">
                    From UAE
                  </div>
                </div>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
