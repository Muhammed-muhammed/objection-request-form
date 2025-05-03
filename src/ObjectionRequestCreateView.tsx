import React, { useState } from 'react';
import { Box, Button, Grid, MenuItem, TextField, Typography } from '@mui/material';
import ObjectionRequestModel from './ObjectionRequestModel';
import ObjectionRequestDetailModel from './ObjectionRequestDetailModel';
import ObjectionRequestService from './ObjectionRequestService';
import ObjectionReasonService from './ObjectionReasonService';

interface WarningItem {
  warningId: string;
  violationDeliveryType: string;
  address: string;
  violationType: string;
}

interface Props {
  selectedWarnings: WarningItem[];
  inquiryId: string;
  onSuccess?: () => void;
  onBack?: () => void;
}

const ObjectionRequestCreateView: React.FC<Props> = ({
  selectedWarnings,
  inquiryId,
  onSuccess,
  onBack
}) => {
  const [details, setDetails] = useState<Record<string, ObjectionRequestDetailModel>>(() => {
    const initial: Record<string, ObjectionRequestDetailModel> = {};
    selectedWarnings.forEach(w => {
      initial[w.warningId] = new ObjectionRequestDetailModel();
    });
    return initial;
  });

  const [reasons, setReasons] = useState<{ id: string; label: string }[]>([]);

  React.useEffect(() => {
    ObjectionReasonService.INSTANCE.search().then(setReasons);
  }, []);

  const handleChange = (warningId: string, field: keyof ObjectionRequestDetailModel, value: any) => {
    setDetails(prev => ({
      ...prev,
      [warningId]: {
        ...prev[warningId],
        [field]: value
      }
    }));
  };

  const handleSubmit = () => {
    const model = new ObjectionRequestModel();
    model.inquiry = { id: inquiryId };
    model.objectionRequestDetailList = Object.values(details);
    ObjectionRequestService.INSTANCE.saveOrUpdate(model, () => {
      alert('Objection saved!');
      onSuccess?.();
    });
  };

  return (
    <Box p={4}>
      <Typography variant="h5" gutterBottom>
        Objection Request Form
      </Typography>
      {selectedWarnings.map(warning => (
        <Box key={warning.warningId} mb={4} border={1} borderRadius={2} p={2} borderColor="grey.300">
          <Typography variant="subtitle1">
            ⚠️ {warning.violationType} at {warning.address}
          </Typography>
          <Grid container spacing={2} mt={1}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Document Name"
                value={details[warning.warningId]?.documentName || ''}
                onChange={(e) => handleChange(warning.warningId, 'documentName', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="Objection Reason"
                value={details[warning.warningId]?.objectionReason?.id || ''}
                onChange={(e) => handleChange(warning.warningId, 'objectionReason', reasons.find(r => r.id === e.target.value))}
              >
                {reasons.map(reason => (
                  <MenuItem key={reason.id} value={reason.id}>{reason.label}</MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                multiline
                rows={3}
                value={details[warning.warningId]?.description || ''}
                onChange={(e) => handleChange(warning.warningId, 'description', e.target.value)}
              />
            </Grid>
          </Grid>
        </Box>
      ))}
      <Box display="flex" justifyContent="space-between">
        <Button variant="outlined" onClick={onBack}>Back</Button>
        <Button variant="contained" onClick={handleSubmit}>Submit</Button>
      </Box>
    </Box>
  );
};

export default ObjectionRequestCreateView;
