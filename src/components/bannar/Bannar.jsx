import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";



const Bannar = () => {
    return (
        <div>
            <div className="container mx-auto">
                <Carousel autoPlay={true} interval={2000} infiniteLoop={true}>
                    <div className="h-[550px]">
                        <img className="h-full object-cover" src={'https://i.ibb.co/fqBvW9p/r-s.png'} />
                    </div>
                    <div className="h-[550px]">
                        <img className="h-full object-cover" src={'https://i.ibb.co/rbPRjLd/6-5192e24d-d45f-48ec-acb0-f1c0180b9c91-1200x1200.png'} />
                    </div>
                    <div className="h-[550px]">
                        <img className="h-full object-cover" src={'https://i.ibb.co/J3j85Dw/laptops-2048px-8826.jpg'} />
                    </div>
                  

                </Carousel>

                

            </div>
        </div>
    );
};

export default Bannar;