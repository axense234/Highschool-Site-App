this.addEventListener("push", async (e) => {
  const payload = e.data.json();
  console.log(payload);
  payload.icon =
    "https://res.cloudinary.com/birthdayreminder/image/upload/v1689691429/Highschool%20Site%20App/logo%20for%20pwa.png";

  await e.waitUntil(
    // eslint-disable-next-line no-restricted-globals
    self.registration.showNotification(
      payload.title || "Test Notification",
      payload
    )
  );
});
