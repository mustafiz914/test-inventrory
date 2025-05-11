import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const categories = [
  'Weapons',
  'Electronics',
  'Uniform',
  'Navigation',
  'Communication',
  'Medical',
  'Other'
];

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  category: Yup.string().required('Required').oneOf(categories),
  quantity: Yup.number().required('Required').min(0, 'Must be positive'),
  problem: Yup.string().default('None')
});

const ItemForm = ({ open, onClose, onSubmit, initialValues }) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{initialValues._id ? "Edit Inventory Item" : "Add New Inventory Item"}</DialogTitle>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          onSubmit(values);
          resetForm();
          onClose();
        }}
        enableReinitialize
      >
        {({ errors, touched, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <DialogContent>
              <Field
                as={TextField}
                name="name"
                label="Item Name"
                fullWidth
                margin="normal"
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name}
              />
              
              <Field
                as={TextField}
                name="category"
                label="Category"
                select
                fullWidth
                margin="normal"
                error={touched.category && Boolean(errors.category)}
                helperText={touched.category && errors.category}
              >
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Field>
              
              <Field
                as={TextField}
                name="quantity"
                label="Quantity"
                type="number"
                fullWidth
                margin="normal"
                error={touched.quantity && Boolean(errors.quantity)}
                helperText={touched.quantity && errors.quantity}
              />
              
              <Field
                as={TextField}
                name="problem"
                label="Problem/Issue"
                fullWidth
                margin="normal"
                multiline
                rows={3}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={onClose}>Cancel</Button>
              <Button type="submit" variant="contained" color="primary">
                {initialValues._id ? "Update" : "Save"}
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default ItemForm;