//Sort Contacts Alphabetically

export function sortContacts(contacts, saveContacts, displayContacts, key = 'name') {
  quickSort(contacts, 0, contacts.length - 1, key);  
  saveContacts(); 
  displayContacts(contacts);
}

function quickSort(arr, left, right, key) {
  if (left < right) {
      const pivotIndex = partition(arr, left, right, key);  
      quickSort(arr, left, pivotIndex - 1, key);  
      quickSort(arr, pivotIndex + 1, right, key);  
  }
}

function partition(arr, left, right, key) {
  const pivot = arr[right][key].toLowerCase();  
  let i = left - 1;

  for (let j = left; j < right; j++) {
      if (arr[j][key].toLowerCase() < pivot) {
          i++;
          [arr[i], arr[j]] = [arr[j], arr[i]];  
      }
  }

  [arr[i + 1], arr[right]] = [arr[right], arr[i + 1]];
  return i + 1;  
}
