import urlMetadata from 'url-metadata';
import type { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { TableName } from '../common/config';
import dynamoClient from '../common/dynamoClient';
import lambda from '../common/lambda';
import { headers } from '../common/headers';

const readBoardHandler = async (event) => {
  if (event.pathParameters.id) {
    try {
      const { id } = event.pathParameters;
      const params: DocumentClient.GetItemInput = {
        Key: {
          id,
        },
        TableName,
      };
      const data = await dynamoClient.get(params).promise();
      data.Item.elements = await Promise.all(
        data.Item.elements.map(async (element) => {
          if (element.url) {
            const result: urlMetadata.Result = await urlMetadata(element.url);
            return {
              ...element,
              data: {
                image: result.image,
                title: result.title,
                description: result.description,
              },
            };
          }
          return element;
        })
      );
      const response = {
        body: JSON.stringify(data),
        statusCode: 200,
        headers,
      };
      return { response, error: null };
    } catch (error) {
      const response = {
        body: JSON.stringify(error),
        statusCode: 500,
        headers,
      };
      return { response, error };
    }
  } else {
    const response = {
      body: JSON.stringify({
        message: 'Missing the id from the path',
      }),
      statusCode: 400,
      headers,
    };
    return { response, error: null };
  }
};

export const readBoard = lambda(readBoardHandler);
