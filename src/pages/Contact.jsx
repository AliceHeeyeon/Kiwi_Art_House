import axios from 'axios'
import {useState, useEffect} from 'react'
import useCustomiser from '../hooks/useCustomiser'

const formEndpoint = import.meta.env.VITE_WP_CONTACT_FORM_URL

const ContactForm = () => {
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState(false)
  const [statusMessage, setStatusMessage] = useState('')
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [message, setMessage] = useState("")
  const {mainColor} = useCustomiser()

  useEffect(() => {
    let timer;
    if (submitted || error) {
      timer = setTimeout(() => {
        setSubmitted(false);
        setError(false);
        setStatusMessage('');
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [submitted, error]);

  const handleSubmit = (e) => {
      e.preventDefault();
      const contactForm = new FormData()
            contactForm.append('your-name', name)
            contactForm.append('your-email', email)
            contactForm.append('your-phone', phone)
            contactForm.append('your-message', message)

      axios.post(formEndpoint, contactForm, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      })
      .then((res) => {
        console.log(res)
        setSubmitted(true)
        setName("")
        setEmail("")
        setPhone("")
        setMessage("")
        setStatusMessage('Thank you for your message! We\'ll be in touch soon.')
      })
      .catch((err) => {
        console.log(err)
        setError(true)
        setStatusMessage('Error! Sorry, we were unable to send your message.')
      })

  }

  return (
    <div className='contact-form'>
      <form
        onSubmit = {handleSubmit}
        method='POST'
      >
        {/* Name input */}
        <div className='label-input'>
            <label htmlFor='contact-name'>Name</label>
            <input
                id='contact-name'
                type='text'
                name='name'
                onChange={(e) => setName(e.target.value)}
                value={name}
                required
            />
        </div>

        {/* Email input */}
        <div className='label-input'>
            <label htmlFor='contact-email'>Email</label>
            <input
                id='contact-email'
                type='email'
                name='email'
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
            />
        </div>

        {/* Phone input */}
        <div className='label-input'>
            <label htmlFor='contact-phone'>Phone</label>
            <input
                id='contact-phone'
                type='text'
                name='phone'
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
                required
            />
        </div>

        {/* Message input */}
        <div className='label-input'>
            <label htmlFor='contact-message'>Message</label>
            <textarea
                id='contact-message'
                className='message'
                name='message'
                onChange={(e) => setMessage(e.target.value)}
                value={message}
                required
            />
        </div>

        <div className='button-style'>
            <button
                style={{ backgroundColor: mainColor }}
                type='submit'
                className='main-color'
            >
                SEND MESSAGE
            </button>
        </div>
      </form>
      
      {statusMessage && <div className="status-message">{statusMessage}</div>}
    </div>
  )
}

const Contact = () => {

  return (
    <>
      <div id='contact-page' className='page-style'>
        <div className='contact-texts'>
          <h2 className='page-title'>Contact Us</h2>
          <div className='contact-info'>
            <p>04 385 3083</p>
            <p>info@kiwihouse.co.nz</p>
          </div>
        </div>
          
        <ContactForm />
          
      </div>
    </>
  )
}

export default Contact
