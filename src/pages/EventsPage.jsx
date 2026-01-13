import React, { useState } from 'react';
import EventCard from '../components/EventCard';

const EventsPage = () => {
  // We removed the quota, added random locations instead
  const [events] = useState([
    { 
      id: 1, 
      category: "WORKSHOP", 
      title: "Colorful Worlds: Painting Day", 
      date: "January 12, 2026", 
      time: "14:00", 
      location: "Kadikoy Public Education Center", 
      img: "/images/atölye.jpg" 
    },
    { 
      id: 2, 
      category: "EDUCATION", 
      title: "Fairy Tale Hour and Reading", 
      date: "January 15, 2026", 
      time: "13:30", 
      location: "Besiktas District Library", 
      img: "/images/eğitim.jpg" 
    },
    { 
      id: 3, 
      category: "NATURE", 
      title: "Breath for the Future: Sapling Planting", 
      date: "January 20, 2026", 
      time: "09:00", 
      location: "Belgrad Forest Entrance", 
      img: "/images/doğa.jpg" 
    },
    { 
      id: 4, 
      category: "SOCIAL", 
      title: "Nursing Home Visit and Chat", 
      date: "January 22, 2026", 
      time: "11:00", 
      location: "Darulaceze Institution", 
      img: "/images/sosyal.jpg" 
    },
    { 
      id: 5, 
      category: "SPORTS", 
      title: "Friendship Match: Basketball Day", 
      date: "January 25, 2026", 
      time: "16:00", 
      location: "Maltepe Coastal Sports Facilities", 
      img: "/images/spor.jpg" 
    },
    { 
      id: 6, 
      category: "NUTRITION", 
      title: "Happiness Soup Distribution", 
      date: "January 30, 2026", 
      time: "19:00", 
      location: "Uskudar Square", 
      img: "/images/beslenme.jpg" 
    }
  ]);

  return (
    <main className="donation">
      <div className="page-header">
        <h2>Join Our Events</h2>
        <p>
          Follow our workshops, charity meetups, and social events organized to 
          strengthen our community and learn together.
        </p>
      </div>
      
      <section className="box-container">
        {events.map(event => (
          // No function needed anymore, just passing data
          <EventCard key={event.id} event={event} />
        ))}
      </section>
    </main>
  );
};

export default EventsPage;