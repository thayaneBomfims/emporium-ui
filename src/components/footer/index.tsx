import emailjs from 'emailjs-com';
import { Col, Row, Form, Container, Button, Spinner } from "react-bootstrap";
import { useNavigate, useLocation } from 'react-router-dom';
import './styles.scss';
import { useRef, useState } from "react";
import { defaulFormItems } from "./constants";
import AlertToast from '../alertToast';
const instagram = require("../../assets/images/insta.png");
const tiktok = require("../../assets/images/tiktok.png");
const discord = require("../../assets/images/discord.png");
const spotify = require("../../assets/images/spotify.png");
const telegram = require("../../assets/images/telegram.png");

export default function Footer() {
    const location = useLocation();
    const [form, setForm] = useState(defaulFormItems)
    const [loading, setLoading] = useState(false)

    const userID = process.env.REACT_APP_USER_ID;
    const templateID = process.env.REACT_APP_TEMPLATE_ID;
    const serviceID = process.env.REACT_APP_SERVICE_ID;

    const handleForm = (event: any) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        });
    };

    const sendEmail = (e: any) => {
        setLoading(true)
        e.preventDefault();
        e.stopPropagation();

        const form = e.target

        if (userID && templateID && serviceID) {
            emailjs.sendForm(
                serviceID,
                templateID,
                form,
                userID
            ).then((result) => {
                AlertToast(
                    'Mensagem enviada com sucesso!',
                    'success'
                )
            }, (error) => {
                AlertToast(
                    'Erro ao enviar a mensagem!',
                    'error'
                )
            });
        }
        setForm(defaulFormItems)
        setLoading(false)
    }

    if (location.pathname === '/registro' || location.pathname === '/login' || location.pathname === '/') {
        return null;
    }

    return (
        <div className="footer">
            <div className="bg-footer">

                <Container>
                    <Row >
                        <Col md={6} sm={12}>
                            <p>Redes sociais Emporium</p>

                            <Row>
                                <Col>
                                    <img className="imgSocial" src={tiktok} />
                                    <img className="imgSocial" src={telegram} />
                                    <img className="imgSocial" src={instagram} />

                                    <img className="imgSocial d-md-none d-initial" src={spotify} />
                                    <img className="imgSocial d-md-none d-initial" src={discord} />
                                </Col>

                            </Row>
                            <Row className="mt-3 d-none d-md-flex">
                                <Col>
                                    <img className="imgSocial" src={spotify} />
                                    <img className="imgSocial" src={discord} />
                                </Col>

                            </Row>

                            <Row className="mt-3">
                                <p>Explicações financeiras e fiscais</p>
                                <p className='text-align-justify smallText'>O site Emporium <b>não possui anúncios</b> e <b>não é rentável</b> de nenhuma forma.
                                    <b> Nenhum</b> dos artigos redigidos será monetizado através do site e <b>nenhum criador de conteúdo será pago pela escrita dos artigos</b>.
                                    Este site é uma <b>iniciativa sem fins lucrativos</b> para facilitar o estudo e criação de conteúdos relacionados a crenças, vida, fé, pessoas, universo e religião.
                                    <b className='color-important'> Nenhum criador, administrador ou leitor será remunerado</b>.
                                </p>
                            </Row>
                        </Col>

                        <Col md={6} sm={12}>

                            <p>Dúvidas, sugestões e reclamações</p>

                            <Form onSubmit={sendEmail}>
                                <Row>
                                    <Col md={6} sm={12}>
                                        <Form.Control
                                            className="mb-3"
                                            type="text"
                                            placeholder="nome"
                                            required
                                            name="name"
                                            value={form.name}
                                            onChange={handleForm}

                                        />
                                        <Form.Control
                                            type="text"
                                            required
                                            placeholder="email"
                                            name="email"
                                            value={form.email}
                                            onChange={handleForm}
                                        />
                                    </Col>
                                    <Col md={6} sm={12}>
                                        <Form.Group className="mb-3 mt-3 mt-md-0">
                                            <Form.Control
                                                required
                                                placeholder="comentário"
                                                as="textarea"
                                                rows={4}
                                                name="description"
                                                value={form.description}
                                                onChange={handleForm}
                                            />
                                        </Form.Group>
                                    </Col>

                                </Row>

                                <Row className="d-flex justify-content-end">

                                    <Col>
                                        <Button type="submit" className="w-100 buttonDefault btn-send">
                                            {!loading ?
                                                'Enviar' :
                                                <Spinner
                                                    as="span"
                                                    animation="border"
                                                    size="sm"
                                                    role="status"
                                                    aria-hidden="true"
                                                />
                                            }
                                        </Button>
                                    </Col>

                                </Row>
                            </Form>
                        </Col>
                    </Row>

                </Container>

            </div>

            <div className="bg-footer-dark">
                <p>feito com <p className="redColor mx-2"> amor </p> por Thayane Bomfim</p>
            </div>
        </div>
    )

}