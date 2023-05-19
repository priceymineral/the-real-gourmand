# Gourmandize

## Table of Contents
1. [Overview](#overview)
2. [Features](#features)
3. [Walk-Through/Video](#walk-throughvideo)
4. [Tech Stack](#tech-Stack)
5. [Setting Up Application Locally](#setting-up-application-locally)
6. [Starting From Scratch](#starting-from-scratch)
7. [Additional Resources](#additional-resources)
8. [Schema](#schema)

## Overview

This web application was created for the food enthusiast inside us all, replacing the customer experience with the food experience.  Users can access restaurants and their respective reviews, where only the food gets judged.

**LIVE LINK:** [Gourmandize](https://gourmandize-e0kd.onrender.com) (Hosted on free version of render, please be patient)

## Features

  - Users can browse a list of restaurants or select a random restaurant.
  - Users can view more details about a restaurant.
  - Each restaurant will have a list of reviews left by our gourmandizers.
  - Users will have access to the restaurant menu, if available.
  - Upon signing up or signing in, users can write reviews.
  - Logged-in users can view a list of restaurants on which they have left a review.
  - Logged-in users can also edit or delete their reviews.
  - Logged-in users can add new restaurants to our application.
  - Logged-in users can also edit their restaurant.

## Tech Stack

  - React in Rails (React as a View Component of the Rails MVC framework)
  - Javascript
  - Ruby
  - CSS/SCSS
  - PostgreSQL
  - Packages/Dependencies:
    - webpacker
    - bootstrap
    - reactstrap
    - rspec-rails
    - react-rails
    - @babel/preset-react
    - @rails/activestorage
    - @rails/ujs
    - devise
    - faker
    - curb
    - dotenv
  - Render (Web Deployment)

## Setting Up Application Locally

```bash
  # Clone repository
  $ git clone https://github.com/starship-commander/gourmandize.git

  # Finish Setup: In the root project directory (installs dependencies and set-up database)
  $ bundle
  $ yarn
  $ rails db:setup 

  # Start the App (run the server)
  $ rails s  
```

## Starting From Scratch
- Terminal Command:
```bash
    $ rails new <app-name> -d postgresql -T
    $ cd <app-name>
    $ rails db:create
    $ bundle add rspec-rails
    $ rails generate rspec:install
    $ bundle add webpacker
    $ bundle add react-rails
    $ rails webpacker:install
    $ rails webpacker:install:react
    $ yarn add @babel/preset-react
    $ yarn add @rails/activestorage
    $ yarn add @rails/ujs
    $ rails generate react:install
    $ rails generate react:component App
    $ bundle add devise
    $ rails generate devise:install
    $ rails generate devise User
    $ rails db:migrate
    $ rails generate controller Home index

    # Additional Configuration
    $ rails generate resource ModelName attribute:datatype attribute:datatype...
    $ rails db:migrate
```

### Devise Configuration
- Path To File: config/environments/development.rb
    - Add Code: 
    ```ruby
        config.action_mailer.default_url_options = { host: 'localhost', prot: 3000 }
    ```
- Path To File: config/initializers/devise.rb
    - Add Code:
    ```ruby
        # Find this line:
        config.sign_out_via = :delete
        # Replace it with this line:
        config.sign_out_via = :get
    ```
- Path To File: app/views/home/index.html.erb
    - Add Code:
    ```erb
        <%= react_component 'App', {
        logged_in: user_signed_in?,
        current_user: current_user,
        new_user_route: new_user_registration_path,
        sign_in_route: new_user_session_path,
        sign_out_route: destroy_user_session_path
        } %>
    ```

### React in Rails Configuration
- Path To File: app/views/layouts/application.html.erb
    - Add Code:
    ```erb
        # Find this line:
        <%= javascript_importmap_tags %>
        # Replace it with this line:
        <%= javascript_pack_tag 'application', 'data-turbolinks-track': 'reload' %>
    ```
- Path To File: config/routes.rb
    - Add Code:
    ```ruby
        # These lines added:
        get '*path', to: 'home#index', constraints: ->(request){ request.format.html? }
        root 'home#index'
    ```

### React Routing Configuration
- Terminal Command:
```bash
    $ yarn add react-router-dom
```
- Path To File: app/javascript/components/App.js
    - Add Code:
    ```javascript
        import { BrowserRouter, Routes, Route } from "react-router-dom"
    ```

### Reactstrap Configuration
- Terminal Command:
```bash
    $ bundle add bootstrap
    $ mv app/assets/stylesheets/application.css app/assets/stylesheets/application.scss
    $ yarn add reactstrap
```
- Path To File: app/assets/stylesheets/application.scss
    - Add Code:
    ```scss
        @import "bootstrap";
    ```
### Testing
- Terminal Command:
```bash
    $ yarn test
    $ rspec spec
```

## Additional Resources
  1. [React-Rails Project Docs](https://github.com/reactjs/react-rails)
  2. [Reactstrap](https://reactstrap.github.io/?path=/story/home-installation--page)
  3. [Sass Documentation](https://sass-lang.com/documentation/syntax)
  4. [Devise GitHub Repo](https://github.com/heartcombo/devise#getting-started)
  5. [Faker-Ruby](https://github.com/faker-ruby/faker)
  6. [Curb](https://github.com/taf2/curb)
  7. [Dotenv](https://github.com/bkeepers/dotenv)

## Schema

### Restaurant Model:
- belongs to user, has many reviews

| **Property** | **Data-Type** |
| ------------ | ------------- |
| ID (PK)      | Integer       |
| name         | String        |
| cuisine      | String        |
| street       | String        |
| city         | String        |
| state        | String        |
| zip_code     | Integer       |
| avg_rating   | Float         |
| number_of_reviews | Integer  |
| price_range  | String        |
| menu_link    | Text          |
| images       | String        |
| user_id (FK) | Integer       |

### Review Model:
- belongs to restaurant and user

| **Property** | **Data-Type** |
| ------------ | ------------- |
| ID (PK)      | Integer       |
| meal         | String        |
| content      | Text          |
| image        | Text          |
| rating       | Integer       |
| user_id (FK) | Integer       |
| restaurant_id (FK) | Integer       |

### User Model:
- has many restaurants and reviews

| **Property** | **Data-Type** |
| ------------ | ------------- |
| ID (PK)      | Integer       |
| email        | String        |
| password     | String        |
| username     | String        |

## Yelp API Business Model Example:
```ruby
    {
    "id"=>"eGhOLzFFIhrvF6QjSSpJsg", 
    "alias"=>"phils-bbq-san-diego-2", 
    "name"=>"Phil's BBQ", 
    "image_url"=>"https://s3-media2.fl.yelpcdn.com/bphoto/IijLAPbkYwMrvcMgNo_8vw/o.jpg", 
    "is_closed"=>false, 
    "url"=>"https://www.yelp.com/biz/phils-bbq-san-diego-2?adjust_creative=AemLlpZtoX7awyuA4xnLOw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=AemLlpZtoX7awyuA4xnLOw", 
    "review_count"=>15751, 
    "categories"=>[
        {"alias"=>"bbq", "title"=>"Barbeque"}, 
        {"alias"=>"bars", "title"=>"Bars"}, 
        {"alias"=>"tradamerican", "title"=>"American (Traditional)"}
    ], 
    "rating"=>4.5, 
    "coordinates"=>{
        "latitude"=>32.7547792020658, 
        "longitude"=>-117.21598848605
    }, 
    "transactions"=>["delivery"], 
    "price"=>"$$", 
    "location"=>{
        "address1"=>"3750 Sports Arena Blvd", 
        "address2"=>"", 
        "address3"=>"", 
        "city"=>"San Diego", 
        "zip_code"=>"92110", 
        "country"=>"US", 
        "state"=>"CA", 
        "display_address"=>[
        "3750 Sports Arena Blvd", 
        "San Diego, CA 92110"]
        }, 
    "phone"=>"+16192266333", 
    "display_phone"=>"(619) 226-6333", 
    "distance"=>7024.037700535082
    }
```
