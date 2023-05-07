import { useEffect } from 'react';
import { Contributor, fetchContributors } from '../../store/reducers/contributors/contributorsActionCreator';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import TeamCard from '../TeamCard/TeamCard';

const contributorPM = {
  first_name: 'Privet',
  last_name: 'Privetov',
  middle_name: 'Privetovich',
  photo: 'https://i.pinimg.com/236x/05/30/4c/05304c9e8d8b327db682d23cde2244b3.jpg',
  role: 'Project Manager',
  contacts: [
    {
      social_network: 'Telegram',
      contact: 'blabla',
    },
    {
      social_network: 'GitHub',
      contact: 'blabla',
    },
    {
      social_network: 'Instagram',
      contact: 'blabla',
    },
  ]
};

const contributorBE = {
  first_name: 'Privet',
  last_name: 'Privetov',
  middle_name: 'Privetovich',
  photo: 'https://i.pinimg.com/236x/05/30/4c/05304c9e8d8b327db682d23cde2244b3.jpg',
  role: 'Backend',
  contacts: [
    {
      social_network: 'Telegram',
      contact: 'blabla',
    },
    {
      social_network: 'GitHub',
      contact: 'blabla',
    },
    {
      social_network: 'Instagram',
      contact: 'blabla',
    },
  ]
};

const contributorFE = {
  first_name: 'Privet',
  last_name: 'Privetov',
  middle_name: 'Privetovich',
  photo: 'https://i.pinimg.com/236x/05/30/4c/05304c9e8d8b327db682d23cde2244b3.jpg',
  role: 'Frontend',
  contacts: [
    {
      social_network: 'Telegram',
      contact: 'blabla',
    },
    {
      social_network: 'GitHub',
      contact: 'blabla',
    },
    {
      social_network: 'Instagram',
      contact: 'blabla',
    },
  ]
};

const contributorUI = {
  first_name: 'Privet',
  last_name: 'Privetov',
  middle_name: 'Privetovich',
  photo: 'https://i.pinimg.com/236x/05/30/4c/05304c9e8d8b327db682d23cde2244b3.jpg',
  role: 'UI/UX дизайнер',
  contacts: [
    {
      social_network: 'Telegram',
      contact: 'blabla',
    },
    {
      social_network: 'GitHub',
      contact: 'blabla',
    },
    {
      social_network: 'Instagram',
      contact: 'blabla',
    },
  ]
};

const contributorEN = {
  first_name: 'Privet',
  last_name: 'Privetov',
  middle_name: 'Privetovich',
  photo: 'https://i.pinimg.com/236x/05/30/4c/05304c9e8d8b327db682d23cde2244b3.jpg',
  role: 'QA Engineer',
  contacts: [
    {
      social_network: 'Telegram',
      contact: 'blabla',
    },
    {
      social_network: 'GitHub',
      contact: 'blabla',
    },
    {
      social_network: 'Instagram',
      contact: 'blabla',
    },
  ]
};

const contributorCO = {
  first_name: 'Privet',
  last_name: 'Privetov',
  middle_name: 'Privetovich',
  photo: 'https://i.pinimg.com/236x/05/30/4c/05304c9e8d8b327db682d23cde2244b3.jpg',
  role: 'QA Consultant',
  contacts: [
    {
      social_network: 'Telegram',
      contact: 'blabla',
    },
    {
      social_network: 'GitHub',
      contact: 'blabla',
    },
    {
      social_network: 'Instagram',
      contact: 'blabla',
    },
  ]
};

const contributorPO = {
  first_name: 'Privet',
  last_name: 'Privetov',
  middle_name: 'Privetovich',
  photo: 'https://i.pinimg.com/236x/05/30/4c/05304c9e8d8b327db682d23cde2244b3.jpg',
  role: 'Product Owner',
  contacts: [
    {
      social_network: 'Telegram',
      contact: 'blabla',
    },
    {
      social_network: 'GitHub',
      contact: 'blabla',
    },
    {
      social_network: 'Instagram',
      contact: 'blabla',
    },
  ]
};

const contributors = [
  contributorPM,
  contributorPM,
  contributorPM,
  contributorBE,
  contributorBE,
  contributorBE,
  contributorBE,
  contributorBE,
  contributorFE,
  contributorUI,
  contributorEN,
  contributorCO,
  contributorPO
];

const Team = () => {

  const dispatch = useAppDispatch();
  const team = useAppSelector(state => state.contributors.contributors);

  useEffect(() => {
    dispatch(fetchContributors());
  }, []);

  type SectionType = {
    sectionName: string
    sectionContributors: Contributor[]
  };

  let sectionsArr: SectionType[] = [];

  contributors.forEach((contributor) => {
    const sectionObj = sectionsArr.find(section => section.sectionName === contributor.role);
    if (!sectionObj) {
      sectionsArr.push({
        sectionName: contributor.role,
        sectionContributors: [contributor]
      });
    } else {
      sectionObj.sectionContributors.push(contributor);
    }
  });

  const sectionsWithSoloContributor = sectionsArr.filter(section => section.sectionContributors.length === 1 && section.sectionName !== 'Product Owner');

  const sectionsWithProductOwner = sectionsArr.filter(section => section.sectionName === 'Product Owner');

  const sectionsWithContributors = sectionsArr.filter(section => section.sectionContributors.length > 1 && section.sectionName !== 'Product Owner');

  return (
    <section className='contributors sections'>
      <h1 className='contibutors__title page__title'>
        Наша <span className='page__span'>команда</span>
      </h1>
      <>
        {
          sectionsWithContributors.map((section) => {
            return (
              <div key={section.sectionName} className='contributors__section'>
                <h2 className='contributors__subtitle page__title'>
                  {
                    section.sectionName.split(' ').length === 2 ?
                      <>
                        <span className='page__span'>
                          {section.sectionName.split(' ')[0]}
                        </span> {section.sectionName.split(' ')[1]}
                      </>
                      :
                      section.sectionName.includes('end')
                        ?
                        <>
                          {section.sectionName.slice(0)}<span className='page__span'>{section.sectionName.slice(-3)}</span>
                        </>
                        :
                        null
                  }
                </h2>
                <ul className='contributors__items page__list'>
                  {
                    section.sectionContributors.map((contributor) => {
                      return (
                        <TeamCard key={contributor.first_name + contributor.last_name} contributor={contributor} />
                      )
                    })
                  }
                </ul>
              </div>
            )
          })
        }
        <div className='contributors__solo-section'>
          {
            sectionsWithSoloContributor.map((section) => {
              return (

                <div key={section.sectionName} className='contributors__section'>
                  <h2 className='contributors__subtitle page__title'>
                    {
                      section.sectionName.split(' ').length === 2 ?
                        <>
                          <span className='page__span'>
                            {section.sectionName.split(' ')[0]}
                          </span> {section.sectionName.split(' ')[1]}
                        </>
                        :
                        section.sectionName.includes('end')
                          ?
                          <>
                            {section.sectionName.slice(0)}<span className='page__span'>{section.sectionName.slice(-3)}</span>
                          </>
                          :
                          null
                    }
                  </h2>
                  <ul className='contributors__items page__list'>
                    {
                      section.sectionContributors.map((contributor) => {
                        return (
                          <TeamCard key={contributor.first_name + contributor.last_name} contributor={contributor} />
                        )
                      })
                    }
                  </ul>
                </div>

              )
            })
          }
        </div>
        {
          sectionsWithProductOwner.map((section) => {
            return (
              <div key={section.sectionName} className='contributors__section'>
                <h2 className='contributors__subtitle page__title'>
                  {
                    section.sectionName.split(' ').length === 2 ?
                      <>
                        <span className='page__span'>
                          {section.sectionName.split(' ')[0]}
                        </span> {section.sectionName.split(' ')[1]}
                      </>
                      :
                      section.sectionName.includes('end')
                        ?
                        <>
                          {section.sectionName.slice(0)}<span className='page__span'>{section.sectionName.slice(-3)}</span>
                        </>
                        :
                        null
                  }
                </h2>
                <ul className='contributors__items page__list'>
                  {
                    section.sectionContributors.map((contributor) => {
                      return (
                        <TeamCard key={contributor.first_name + contributor.last_name} contributor={contributor} />
                      )
                    })
                  }
                </ul>
              </div>
            )
          })
        }
      </>
    </section>
  )
};

export default Team;
