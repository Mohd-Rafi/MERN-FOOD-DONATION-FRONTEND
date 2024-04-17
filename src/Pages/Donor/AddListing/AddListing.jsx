import { useEffect, useState } from 'react';
import NavDonor from '../../../Components/NavDonor/NavDonor';
import './AddListing.css';
import customAxios from '../../../../utils/customAxios';
import { getLoggedInId } from '../../../../utils';
import { PlusOutlined } from '@ant-design/icons';
import { Image, Upload, Checkbox, Space, TimePicker } from 'antd';
import dayjs from 'dayjs';
import './AddListing.css';
import { DisabledByDefault } from '@mui/icons-material';
import moment from 'moment/moment';
import { useNavigate } from 'react-router-dom';

const getBase64 = file =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

const AddListing = () => {
  //
  const [items, setItems] = useState({
    name: '',
    images: [],
    description: '',
    location: '',
    donor: getLoggedInId(),
    category: '',
    startTime: '',
    endTime: '',
    date: '',
    status: 'FREE',
    headCount: '',
  });
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState([]);

  const navigate = useNavigate();

  //categories options
  const options = [
    {
      label: 'Veg',
      value: 'Veg',
    },
    {
      label: 'Non Veg',
      value: 'Non Veg',
    },
    {
      label: 'Others',
      value: 'Others',
    },
  ];
  const handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  // const handleChange = ({ fileList: newFileList }) => {
  //   setFileList(newFileList);
  //   let updatedImages = {};
  //   for (let i = 0; i < newFileList.length; i++) {
  //     updatedImages = { ...updatedImages, [i]: newFileList[i].response };
  //   }
  //   setItems({ ...items, images: updatedImages });
  // };

  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    let updatedImages = [];
    newFileList.forEach((file, index) => {
      if (file.response && file.response.url) {
        updatedImages[index] = file.response.url;
      } else if (file.url) {
        updatedImages[index] = file.url;
      }
    });
    setItems({ ...items, images: updatedImages });
  };

  // const handleChange = ({ fileList: newFileList }) => {
  //   setFileList(newFileList);
  //   let updatedImages = {};
  //   for (let i = 0; i < newFileList.length; i++) {
  //     updatedImages = { ...updatedImages, [i]: newFileList[i] };
  //   }
  //   if (updatedImages && updatedImages[0].response) {
  //     setItems({ ...items, images: updatedImages[0].response.url });
  //   }
  // };

  const onChange = (e, key) => {
    if (key == 'startTime' || key == 'endTime') {
      const format = moment(e.target.value, ['HH:mm']).format('hh:mm a');
      setItems({ ...items, [key]: format });
    }
    if (key == 'category') {
      setItems({ ...items, category: e });
    } else {
      setItems({ ...items, [key]: e.target.value });
    }
    console.log(items);
  };
  const onAddDonationBtnClick = async () => {
    try {
      await customAxios.post('/listing', items);
      navigate('/donor/home');
    } catch (e) {
      console.log(e);
    }
  };

  // console.log(items);

  return (
    <div className="addListing-main">
      <NavDonor />
      <div className="addListing-main-container">
        <div className="addListing-main-container-left">
          <div className="inputs">
            <span>Item Name</span>
            <input
              type="text"
              placeholder="Item name"
              onChange={e => onChange(e, 'name')}
            />
          </div>
          <div className="inputs">
            <span>Item Description</span>
            <input
              type="text"
              placeholder="Description"
              onChange={e => onChange(e, 'description')}
            />
          </div>

          <div className="inputs">
            <span>Your Location</span>
            <input
              type="text"
              placeholder="location"
              onChange={e => onChange(e, 'location')}
            />
          </div>
          <div className="categories">
            <p>Categroies</p>
            <div className="cartegories-container">
              <Checkbox.Group
                options={options}
                onChange={e => onChange(e, 'category')}
              />
            </div>
          </div>
        </div>
        <div className="addListing-main-container-right">
          <div className="right-inputs">
            <span>Item images</span>
            <Upload
              action="http://localhost:3000/upload/image"
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
              className="image-container"
            >
              {fileList.length >= 4 ? null : (
                <button
                  style={{
                    border: 0,
                    background: 'none',
                  }}
                  type="button"
                >
                  <PlusOutlined />
                  <div
                    style={{
                      marginTop: 8,
                    }}
                  >
                    Upload
                  </div>
                </button>
              )}
            </Upload>
            {previewImage && (
              <Image
                wrapperStyle={{
                  display: 'none',
                }}
                preview={{
                  visible: previewOpen,
                  onVisibleChange: visible => setPreviewOpen(visible),
                  afterOpenChange: visible => !visible && setPreviewImage(''),
                }}
                src={previewImage}
              />
            )}
          </div>
          <div className="right-inputs">
            <span>Starting Date </span>
            <input
              type="date"
              onChange={e => onChange(e, 'date')}
              min={moment().format('YYYY-MM-DD')}
            />
          </div>
          <div className="right-inputs">
            <div className="left">
              <div className="start-time">
                <span>Starting Time </span>
                <input type="time" onChange={e => onChange(e, 'startTime')} />
              </div>
              <div className="start-time end-time">
                <span>Ending Time </span>
                <input type="time" onChange={e => onChange(e, 'endTime')} />
              </div>
              <div className="headCount">
                <span>Head Count</span>
                <input type="number" onChange={e => onChange(e, 'headCount')} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="add-listing-btn">
        <button onClick={onAddDonationBtnClick}>Add new donation</button>
      </div>
    </div>
  );
};

export default AddListing;
