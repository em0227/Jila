## Jila

This is a basic “help desk” / support system ticket management
system.

### Production Link

https://jila-fe.vercel.app/tickets

### Navigation

Choose your role first, users can only create a ticket. Admin will be able to create a ticket, view all the tickets, view an individual ticket, update the status of the ticket, and add replies to the ticket.

### Available FE Routes

- /
- /tickets
- /ticket/:id

### Design Thoughts

- Express.js and Postgresql are the backend engine and database.
- Next.js is the frontend framework.
- Backend routes are grouped as APIs for tickets and replies.
- Data input validation is done on both frontend and backend.
- User flow:
  - user lands on the home page
  - decide a role (which would usually be log in and authenticate permissions there)
  - user clicks on Create Ticket
  - fill in the required fields
  - submit ticket
  - receive feedback if the ticket is submitted successfully
  - handle errors and provide an error message
  - admin can view all tickets
  - admin click on a row to view individual ticket
  - admin change ticket status and update
  - admin leaves a reply for ticket updates

### Some troubles I encountered...

1. Deploying the project: this turned out to be the biggest problem I encountered. Originally I was going to deploy on AWS EC2/ECS since I'm more familiar with it from work experience, but I guess I didn't use my personal account for so long so I have to contact support because it is blocked. So I have to quickly learn how to deploy to Vercel.
2. Configuration: I was expecting this would take some time since we don't create new projects every day so my skills are a little rusty when trying to set up the express.js app and next.js apps and make them up and running at first.
3. Nextjs 13.4.0: I started out with the latest version, then realized the package concurrently doesn't work with Next 14, so I downgraded to 13. However, the app directory was already set up so I didn't want to change it. We use 13.0.4 at work, and since 13.4.0 the app directory file structure was recommended to be used, I didn't realize there would be so many little different things (ex: using page.js instead of index.js, new file layout.js available for styling, need to add 'use client' on the pages otherwise it breaks, etc). Spent a bit more time looking up the docs than I expected here.

### Note

- When trying to deploy FE, somehow it can pick up the frontend folder properly, so I copied and pasted the code to another new repo , and it was successfully deployed. I'll continue to debug why this file structure doesn't work in later future.
- I would like to add useContext to reinforce permission-based view on the front end in later future too.
