import type { DocumentClient } from 'aws-sdk/clients/dynamodb';
import dynamoClient from '../common/dynamoClient';
import lambda from '../common/lambda';
import bodyParser from '../common/bodyParser';
import { TableName } from '../common/config';
import { headers } from '../common/headers';

const updateBoardHandler = async (event) => {
  const body = bodyParser(event);

  if (body) {
    try {
      const { id } = event.pathParameters;
      const partialParams: Partial<DocumentClient.UpdateItemInput> = body.title
        ? {
            UpdateExpression: 'set title = :title',
            ExpressionAttributeValues: {
              ':title': body.title,
            },
          }
        : body.element
        ? {
            UpdateExpression:
              'set elements = list_append(if_not_exists(elements, :empty_list), :element)',
            ExpressionAttributeValues: {
              ':empty_list': [],
              ':element': [body.element],
            },
          }
        : {
            UpdateExpression: 'set elements = :elements',
            ExpressionAttributeValues: {
              ':elements': body.elements,
            },
          };
      const params: DocumentClient.UpdateItemInput = {
        TableName,
        Key: {
          id,
        },
        ReturnValues: 'UPDATED_NEW',
        ...partialParams,
      };
      const data = await dynamoClient.update(params).promise();
      const response = {
        body: JSON.stringify(data),
        statusCode: 200,
        headers,
      };
      return {
        response,
        error: null,
      };
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
        input: event.body,
        message: 'Bad input data or missing text',
      }),
      statusCode: 422,
      headers,
    };
    return { response, error: null };
  }
};

export const updateBoard = lambda(updateBoardHandler);
