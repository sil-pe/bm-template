import * as settings from 'settings';


const baseURL = settings.apiURL;

const fetchExercise = async (exercisePath: string): Promise<any> => {
  const exerciseURL = `${baseURL}/static_xml/content_elements_de/${exercisePath}.xml`;

  return fetch(exerciseURL)
    .then(async result => result.text());
};
