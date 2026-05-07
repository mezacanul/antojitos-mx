import { fakerES_MX as faker } from "@faker-js/faker";
import axios from "axios";

const apiURL = "http://localhost:5000/api";

export async function seedOnboarding(
  prisma: any,
  limit: number
) {
  const allOnboardings = [];
  const allBusinessCategories =
    await prisma.businessCategory.findMany();
  const allCities = await prisma.city.findMany();
  const totales = {
    bc: allBusinessCategories.length,
    c: allCities.length,
  };

  for (let i = 0; i < limit; i++) {
    const randomIdx = Math.floor(
      Math.random() * totales.bc
    );
    const randomIdx2 = Math.floor(
      Math.random() * totales.c
    );
    const categoryId = allBusinessCategories[randomIdx].id;
    const city = allCities[randomIdx2];
    const stateId = city.stateId;

    const newOnboarding = {
      businessFormData: {
        name: faker.company.name(),
        category_id: categoryId,
      },
      userFormData: {
        names: `${faker.person.firstName()} ${faker.person.firstName()}`,
        maternal_surname: faker.person.middleName(),
        paternal_surname: faker.person.middleName(),
        email: faker.internet.email(),
        phone: faker.phone.number(),
        password: "dev@2026",
        confirm_password: "dev@2026",
      },
      branchFormData: {
        name: `${faker.person.firstName()} ${
          randomIdx2 + 1
        }`,
        address: faker.location.streetAddress(),
        latitude: faker.location.latitude(),
        longitude: faker.location.longitude(),
        zip: faker.location.zipCode(),
        cityId: city.id,
        stateId: stateId,
      },
    };

    const result = await axios.post(
      `${apiURL}/onboarding?action=signup`,
      newOnboarding
    );
    allOnboardings.push(result);
    // await prisma.onboarding.create({
    //   data: newOnboarding,
    // });
  }
  return true;
}
