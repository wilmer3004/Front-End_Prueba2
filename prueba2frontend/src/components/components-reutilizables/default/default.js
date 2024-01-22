import React from "react";
import Carousel from "../carrusel/carrusel";
import './default.css';

const Default1 = ({rol}) =>{

    return (
        <div className="contenedorDefault">

            <div className="informacion">
            {rol === "Administrador" ? (
                <p className="">                    
                    ¡Bienvenido al Panel de <strong>Administración</strong> de Servicios!<br /><br />

                    En nuestro espacio dedicado a la venta de servicios, te ofrecemos un sistema de gestión diseñado para simplificar y optimizar tus operaciones. Con acceso a herramientas potentes, podrás controlar eficientemente todos los aspectos relacionados con la comercialización de servicios, desde la gestión de clientes hasta el seguimiento de transacciones.<br /><br />

                    Explora nuestras funciones intuitivas y personalizadas diseñadas para adaptarse a tus necesidades específicas. Este panel te brinda una visión integral de tu negocio, permitiéndote tomar decisiones informadas y estratégicas para impulsar el crecimiento. Estamos comprometidos a proporcionarte un entorno seguro y eficaz.<br /><br />

                    Estamos aquí para apoyarte en cada paso. Si tienes preguntas o necesitas asistencia, nuestro equipo de soporte está a tu disposición. Agradecemos tu confianza y estamos emocionados de ser parte de tu viaje hacia el éxito en la venta de servicios.<br /><br />

                    ¡Gracias por elegirnos y bienvenido a una experiencia de gestión simplificada y efectiva!<br /><br />
                </p>
            ): null}
            {rol === "Empleado" ? (
                <p className="">                    
                    ¡Te damos la bienvenida al Panel de <strong>Empleados!</strong><br /><br />

                    Aquí en nuestro espacio dedicado a la venta de servicios, ofrecemos un entorno colaborativo diseñado para que los empleados gestionen sus responsabilidades de manera eficiente. Desde el seguimiento de tareas hasta la comunicación interna, nuestro panel te proporciona las herramientas necesarias para destacar en tu rol y contribuir al éxito de nuestro equipo.<br /><br />

                    Explora las funciones personalizadas que simplificarán tus tareas diarias y optimizarán la comunicación con tus colegas y supervisores. Estamos comprometidos a brindarte un entorno de trabajo productivo y centrado en el logro de objetivos.<br /><br />

                    Apreciamos tu dedicación y esfuerzo. Si tienes preguntas o necesitas orientación, nuestro equipo está aquí para ayudarte. Gracias por ser parte de nuestro equipo y por contribuir al crecimiento continuo de nuestra empresa. ¡Bienvenido a una experiencia de trabajo colaborativo y enfocado en el éxito!<br /><br />
                </p>
            ): null}
            {rol === "Super Administrador" ? (
                <p className="">                    
                    ¡Bienvenido al Panel de <strong>Super Administrador!</strong><br /><br />

                    En este espacio centralizado para la gestión y supervisión de la venta de servicios, tendrás acceso a un conjunto completo de herramientas y funciones diseñadas para facilitar la administración eficiente de toda la operación. Desde la gestión de usuarios y roles hasta el monitoreo de servicios y procesos, nuestro panel está diseñado para brindarte una visión integral y control total.<br /><br />

                    Explora las capacidades avanzadas de administración que te permitirán tomar decisiones informadas y estratégicas. Como Super Administrador, desempeñas un papel fundamental en el éxito de nuestra plataforma, y estamos aquí para respaldarte en cada paso del camino.<br /><br />

                    Gracias por tu liderazgo y dedicación. Siempre estamos trabajando para mejorar y apreciamos tus contribuciones. Si tienes alguna pregunta o necesitas asistencia, nuestro equipo de soporte está disponible para ayudarte. ¡Bienvenido a la experiencia de administración superior y al impulso del éxito empresarial!<br /><br />
                </p>
                ): null}
            </div>

            <div className="carousel">
            <Carousel />
            </div>
        </div>
    )
};

export default Default1;