// Map.js

import React from 'react';
import Layout from "../components/Layout";

const Map = () => {
  return (
    <Layout>
    <div className="Map">
      <iframe
        title="Temple Location"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3689.253720277665!2d69.84749081396804!3d22.38179064558998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395719e5c0b4fa3d%3A0x196c34d28a20357f!2sShiv%20Temple!5e0!3m2!1sen!2sin!4v1652160154632!5m2!1sen!2sin"
        width="100%"
        height="450"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
    </Layout>
  );
};

export default Map;
