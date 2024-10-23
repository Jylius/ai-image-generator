import axios from 'axios';
import { useState } from 'react';
import LainImage from '../assets/lain.jpeg';
import hackingLain from '../assets/lain.gif';

const Nvidia = () => {
  const [text, setText] = useState('');
  const [generating, setGenerating] = useState(false);
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);

  const invokeUrl = 'http://localhost:3131/gen_z_generator';

  const generateImage = async () => {
    const payload = {
      text_prompts: [
        { text, weight: 1 },
        { text: '', weight: -1 },
      ],
      cfg_scale: 5,
      sampler: 'K_EULER_ANCESTRAL',
      seed: 0,
      steps: 25,
    };

    try {
      setGenerating(true);
      setImage(null);
      setError(null);
      const res = await axios.post(invokeUrl, payload);
      const imageData = res.data.artifacts[0].base64;
      setImage(`data:image/jpeg;base64,${imageData}`);
    } catch (error) {
      console.log('this is error: ', error);
      setError('Görsel oluşturulurken bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setGenerating(false);
    }
  };

  const handleInput = (e) => {
    setText(e.target.value);
  };

  return (
    <div className="container">
      <div className="main-container">
        <div className="title-and-input">
          <div className="text-and-cat">
            <h3>oluşturmak resim merhaba krdşm.</h3>
            {error && <p style={{ color: 'red' }}>{error}</p>}
          </div>

          <div id="input-field">
            <input
              onChange={handleInput}
              placeholder="örn. Serial Experiments Lain but lain is happy"
              disabled={generating}
              style={{ padding: '10px', fontSize: '16px' }}
            />
            <button
              onClick={generateImage}
              disabled={generating}
              style={{
                marginLeft: '10px',
                padding: '10px 20px',
                backgroundColor: generating ? '#aaa' : '#007BFF',
                color: 'white',
                border: 'none',
                cursor: generating ? 'not-allowed' : 'pointer',
              }}
            >
              {generating ? 'Oluşturuluyor...' : 'Oluştur'}
            </button>
          </div>
        </div>

        <div className="image-container" style={{ marginTop: '20px' }}>
          <img
            className="generated-image"
            src={generating ? hackingLain : image ? image : LainImage}
            alt="Generated"
            style={{ width: '100%', maxWidth: '400px' }}
          />
        </div>
      </div>
    </div>
  );
};

export default Nvidia;
