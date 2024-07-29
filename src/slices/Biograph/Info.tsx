"use server";

import { font2 } from "@/app/layout";
import { GoArrowRight } from "react-icons/go";

export const Info = () => {

  return (
    <div>
        <article className="grid grid-cols-2">
            <div>
                <h1 className="text-3xl">
                    Im currently studying in:
                </h1>
                <div className={font2.className}>
                    <h3 className="text-xl text-yellow-300 my-2">
                        Instituto Leonardo Murialdo
                    </h3>
                    <p>
                        A Technical High School with a specialization in Informatics
                    </p>
                </div>
            </div>
            <div>
                <h1 className="text-3xl">
                    Things I mostly like:
                </h1>
                <div className={font2.className}>
                    <ul className="flex flex-col my-2">
                        <li>😺 I like cats</li>
                        <li>🏋🏻‍♂️ Lift some weight</li>
                        <li>🧉 Drink mate</li>
                    </ul>
                </div>
            </div>
        </article>
        <div>
            <section className="flex flex-col justify-center w-full mx-auto mt-40">
                <h1 className="my-4 text-5xl text-center">
                    Always looking forward to chat with you!
                </h1>
                <button>
                    <a href="#" className="btn2">
                        <span className="spn2 inline-flex gap-x-2 items-center">Lets talk!<GoArrowRight /></span>
                    </a>
                </button>
            </section>
        </div>
    </div>
  );
};
