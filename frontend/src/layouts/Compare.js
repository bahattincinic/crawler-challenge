import React, {useCallback, useState} from 'react';
import { Header, Form } from 'semantic-ui-react';
import useProduct from "../hooks/useProduct";
import useFormFields from "../hooks/useFormFields";
import {apiDomain} from "../config";

const Compare = () => {
  const products = useProduct();
  const options = products.map((item, idx) => {
    return {
      key: idx, text: item.name, value: item.id
    }
  });

  const [similarity, setSimilarity] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [fields, handleFieldChange] = useFormFields({
    from_product: "",
    to_product: ""
  });

  const onSubmit = useCallback(() => {
    const params = {
      body: JSON.stringify(fields),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
    };
    setIsLoading(true);
    fetch(`${apiDomain}/api/v1/compare/`, params)
      .then(response => response.json())
      .then(json => setSimilarity(json.similarity))
      .finally(() => setIsLoading(false));
  }, [fields]);

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
          <Form.Button onClick={onSubmit}
                       disabled={!(fields.to_product && fields.from_product) || isLoading}>
            Get Similarity
          </Form.Button>
        </Form>
      </div>

      {similarity && <div>
        Similarity: {similarity}
      </div>}
    </div>
  );
};

export default Compare;
