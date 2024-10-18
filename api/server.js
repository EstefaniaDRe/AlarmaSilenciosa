const nodeMailer = require('nodemailer');

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    const { type } = req.body;

    // Personalizar el contenido del mensaje según el tipo de siniestro
    let message;
    switch (type) {
      case 'Intruso':
        message = 'Alerta: Se ha detectado un intruso en las instalaciones.';
        break;
      case 'Terremoto':
        message = 'Alerta: Se ha registrado un terremoto. Mantenga la calma y siga las instrucciones de seguridad.';
        break;
      case 'Incendio':
        message = 'Alerta: Se ha detectado un incendio. Evacúe el área de inmediato.';
        break;
      default:
        message = 'Alerta: Se ha reportado un siniestro desconocido.';
        break;
    }

    const mailOptions = {
      from: "dd8466958@gmail.com",
      to: "estefaniadrpe@gmail.com",
      subject: `Alerta de Siniestro: ${type}`,
      text: message,
      html: `<h3>${message}</h3>`,
    };

    const transporter = nodeMailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "dd8466958@gmail.com",
        pass: "iohy kzqc bbge qsbb ",  // Considera mover esto a variables de entorno por seguridad
      },
    });

    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: 'Correo enviado correctamente' });
    } catch (error) {
      res.status(500).json({ message: 'Error al enviar el correo', error });
    }
  } else {
    res.status(405).json({ message: 'Método no permitido' });
  }
};
