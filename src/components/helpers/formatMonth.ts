export const formatMonth = [
  'Januari',
  'Februari',
  'Maret',
  'April',
  'Mei',
  'Juni',
  'Juli',
  'Agustus',
  'September',
  'Oktober',
  'November',
  'Desember'
];

export const formatLocalDate = (inputDateStr: string) => {
  const date = new Date(inputDateStr);

  const options: any = {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'Asia/Jakarta' // Set the desired timezone
  };

  const formatter = new Intl.DateTimeFormat('id-ID', options);
  return formatter.format(date);
}

export const formattedDate = (data: any) => {
  const dateParts = data.split('/');
  const day = parseInt(dateParts[0], 10);
  const month = parseInt(dateParts[1], 10); // Months are 0-based (0 = January, 1 = February, etc.)
  const year = parseInt(dateParts[2], 10);
  // Create a Date object with the parsed values
  const formattedDate = new Date(year, month, day);

  // Define a formatting option for the date
  const options: any = {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: 'long',
    timeZone: 'Asia/Jakarta' // Set the desired time zone
  };

  // Format the date using the Intl.DateTimeFormat API
  const formatter = new Intl.DateTimeFormat('en-US', options);
  const formattedDateString = formatter.format(formattedDate);
  return formattedDate;
}

export const localDateFormat = (data: any) => {

  // Convert to the desired time zone (e.g., 'Asia/Jakarta')
  const options = { timeZone: 'Asia/Jakarta' };
  const convertedDate = new Date(data.toLocaleString('en-US', options));

  // Format the date as "8 Maret 2024"
  const formattedDate = convertedDate.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return formattedDate
}

