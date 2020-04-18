import React from 'react';
import { Header, Form } from 'semantic-ui-react';
import useProduct from '../hooks/useProduct';
import useFormFields from '../hooks/useFormFields';
import useCompare from '../hooks/useCompare';

const Compare = () => {
  const products = useProduct();
  const options = products.map((item, idx) => {
    return {
      key: idx, text: item.name, value: item.id
    }
  });

  const [fields, handleFieldChange] = useFormFields({
    from_product: "",
    to_product: ""
  });

  const {
    similarity
  } = useCompare(fields);

  return (
    <div>
      <div className="Products-header">
        <Header as='h1'>Compare HTML Results</Header>

        <Form>
          <Form.Select
            fluid
            id='from_product'
            label='From'
            options={options}
            value={fields.from_product}
            onChange={handleFieldChange}
          />
          <Form.Select
            fluid
            id='to_product'
            label='To'
            options={options}
            value={fields.to_product}
            onChange={handleFieldChange}
          />
        </Form>
      </div>

      {similarity && <div>
        Similarity: {similarity}
      </div>}
    </div>
  );
};

export default Compare;
