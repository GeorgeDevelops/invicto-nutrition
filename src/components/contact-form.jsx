import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import http from "./../services/httpService";
import { toast } from "react-toastify";

function ContactForm() {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(null);

  async function sendMessage(e) {
    e.preventDefault();
    setSending(true);
    let url = process.env.REACT_APP_API_URL;

    const data = {
      name: fullname,
      sender: email,
      subject,
      message,
    };

    let response = await http.post(`${url}/api/email/contact`, data);

    if (response.status && response.status === 200) {
      setSending(false);
      return toast.success("Correo enviado", {
        position: toast.POSITION.TOP_CENTER,
      });
    }

    return toast.error("Correo no enviado", {
      position: toast.POSITION.TOP_CENTER,
    });
  }

  return (
    <Form className="contactForm mb-4">
      <FloatingLabel
        className="mb-3"
        controlId="floatingEmail"
        label="Correo Electronico"
      >
        <Form.Control
          type="email"
          placeholder="Correo Electronico"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FloatingLabel>

      <FloatingLabel
        className="mb-3"
        controlId="floatingEmail"
        label="Nombre Completo"
      >
        <Form.Control
          type="text"
          placeholder="Nombre Completo"
          onChange={(e) => setFullname(e.target.value)}
        />
      </FloatingLabel>

      <FloatingLabel className="mb-3" controlId="floatingSubject" label="Tema">
        <Form.Control
          type="text"
          placeholder="Tema"
          onChange={(e) => setSubject(e.target.value)}
        />
      </FloatingLabel>

      <FloatingLabel
        className="mb-3"
        controlId="floatingMessage"
        label="Mensaje"
      >
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Mensaje"
          onChange={(e) => setMessage(e.target.value)}
        />
      </FloatingLabel>

      <Button variant="primary" type="submit" onClick={sendMessage}>
        {!sending ? "Enviar" : "Enviando..."}
      </Button>
    </Form>
  );
}

export default ContactForm;
