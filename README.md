# I-menu

## Inspiration 

In a world bustling with food options, choosing the perfect meal can be a daunting task, especially when you have specific dietary preferences and allergies. Our hackathon project, "I'Menu," aims to revolutionize the dining experience by putting the power of informed choice in your hands.

Imagine walking into a restaurant, scanning the menu, and effortlessly finding dishes tailored to your taste and dietary needs. With I'Menu, this becomes a reality. Our mobile app allows you to snap a picture of the menu, and in seconds, it analyzes the offerings, taking your preferences and allergies into account. The result? A curated list of menu recommendations just for you.

No more struggling to decode complex menus or worrying about hidden allergens. I'Menu simplifies the dining process, making it an enjoyable and stress-free experience for everyone. From gluten-free to vegan, from spicy to sweet, I'Menu empowers you to explore culinary delights with confidence and ease.

Join us on this journey as we harness the power of technology to enhance the way we dine. I'Menu - where a simple snapshot transforms your dining adventure into an extraordinary culinary journey.

## What it does

I'Menu is a mobile app that simplifies the dining experience by allowing users to take a picture of a menu and, based on their preferences and allergies, provides a curated list of menu recommendations. It uses optical character recognition (OCR) technology to extract text from menu image. But we don't stop here; we go a step further.

Upon opening the app, users are able to uses a user-friendly camera interface for menu scanning and an immersive user profile setup. Users also have the flexibility to modify their preferences and dietary information at any time. We understand that dining preferences are deeply personal, and that's why we believe in I'Menu to tailor your favorite dishes to you.

So in our user profile section, we invite users to provide a bit more about themselves, including details like age, height, weight, and even their religious dietary restrictions.These personal details serve a crucial role in refining your dining recommendations. By understanding your dietary needs, we can create a list of menu items that are not only delicious but also align with your dietary and religious requirements.

Once we've extracted the menu text and obtained the user data, our powerful recommendation engine gets to work. It applies sophisticated algorithms that factor in your preferences and allergies to generate a personalized selection of menu suggestions. Whether you're looking for a gluten-free option, a dish that aligns with your faith, or simply a delightful culinary adventure, I'Menu has you covered.

## How we built it:
1. User Interface Design:
   - Designed a user-friendly mobile app interface with screens for menu scanning and preferences/allergies input.
   - Created a camera interface for users to take pictures of menus.
     
2. User Personal Inforamation:
   - Developed a user profile system within the app.
   - Allowed users to input their dietary preferences and allergies, storing this information for future recommendations.
     
3. Image Recognition:
   - Utilized OCR technology, specifically the Python library Tesseract, to extract text from menu images.

4. Menu Data Processing:
   - Processed and cleaned the extracted text to structure it into a usable format.
   - Identified and categorized menu items and using open ai to provide the list of ingredients.
  
5. Database Integration:
   - Store and manage menu data, user profiles, and recommendation data in a database.

7. Recommendation Engine:
   - Implemented a recommendation engine that factors in user preferences and allergies.
   - Developed algorithms that can filter menu items containing allergens.
   - Depending on complexity, integrated machine learning models that learn user preferences over time.
  
8. Integration Testing:
   - Test the integration of different components to ensure that the menu recognition, user preferences, and recommendations work together.

9. Deployment:
   - Deploy the application to mobile app 

## Challenges we ran into:

1. OCR Accuracy: Overcoming OCR's limitations, such as accurately extracting text from images with varying quality and fonts.
2. Data Quality: Dealing with unstructured menu data and irregularities in menu layouts.
3. Algorithm Complexity:Balancing the simplicity of filtering allergens with the complexity of machine learning for personalized recommendations.
4. Technical difficulty: Establishing Seamless Data Transfer from the Backend to the Frontend, Considering the Use of Separate Applications and functinality for Each.

## Accomplishments that we're proud of:

1. Successfully implemented OCR to extract text from menu images.
2. Imported and structured menu data effectively, making it usable.
3. Developed a user profile system for storing preferences and allergies.
4. Created a functional recommendation engine, adapting to user preferences and allergies.
5. Designed a user-friendly mobile app interface for a better user experience.

## What we learned:

1. Advanced our understanding of OCR technology and its applications.
2. Gained insights into data processing and structuring for menu data.
3. Improved our skills in app development, user interface design, and creating a recommendation engine.
4. Learned about the challenges and complexities of handling user data and privacy.

## What's next:

1. Implement machine learning to enhance personalized recommendations.
2. Incorporate user feedback and ratings to improve the recommendation engine.
3. Expand the app's coverage to a wider range of restaurants and cuisines.
4. Collaborate with restaurant owners to provide real-time menu updates.
5. Explore options for monetization and partnerships within the restaurant industry.
6. Enhance the security and privacy measures for user data, particularly to the user personal information.

I'Menu represents a significant step toward enhancing the dining experience by simplifying menu choices, accommodating dietary restrictions, and providing users with tailored recommendations.



