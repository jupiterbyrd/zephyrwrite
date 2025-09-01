export function getIDs() {
  propertyName = "pageID";
  Object.entries(database.properties).forEach(
    ([propertyName, propertyValue]) => {
      console.log(`${propertyName}: ${propertyValue.type}`);
    }
  );
}
