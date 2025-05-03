import React from 'react';
import ReactDOM from 'react-dom/client';
import ObjectionRequestCreateView from './ObjectionRequestCreateView';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <ObjectionRequestCreateView
      selectedWarnings={[
        { warningId: "w1", violationDeliveryType: "SMS", address: "Tehran, ValiAsr St.", violationType: "Speeding" },
        { warningId: "w2", violationDeliveryType: "App", address: "Isfahan, Chaharbagh", violationType: "Parking" }
      ]}
      inquiryId="inquiry123"
      onSuccess={() => alert("Saved successfully")}
      onBack={() => alert("Going back")}
    />
  </React.StrictMode>
);
