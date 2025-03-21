import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { useEffect, useState } from 'react';
import { gapi } from 'gapi-script';

WebBrowser.maybeCompleteAuthSession();

const CLIENT_ID = '842002469598-v4e16v64br38nv3158rrplisr5upvmp4.apps.googleusercontent.com';
const API_KEY = 'AIzaSyCz2G40aKQb97_BqVsUW8tPH2yAiKwBURE';
const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'];
const SCOPES = 'https://www.googleapis.com/auth/drive.readonly';

export const useGoogleDrive = () => {
  const [token, setToken] = useState(null);

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: CLIENT_ID,
    scopes: [SCOPES],
  });

  useEffect(() => {
    if (response?.type === 'success') {
      setToken(response.authentication.accessToken);
      gapi.load('client', () => {
        gapi.client.init({ apiKey: API_KEY, discoveryDocs: DISCOVERY_DOCS });
      });
    }
  }, [response]);

  const pickFile = async () => {
    if (!token) {
      alert('Debes autenticarte con Google primero.');
      return;
    }

    try {
      const res = await gapi.client.drive.files.list({
        pageSize: 10,
        fields: 'files(id, name, webViewLink, webContentLink)',
      });

      if (res.result.files.length > 0) {
        const file = res.result.files[0]; 
        return file.webContentLink; 
      } else {
        alert('No se encontraron archivos en tu Google Drive.');
        return null;
      }
    } catch (error) {
      console.error('Error al seleccionar archivo:', error);
      return null;
    }
  };

  return { token, promptAsync, pickFile };
};
