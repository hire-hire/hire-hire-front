import { useEffect } from 'react';
import { Contributor, fetchContributors } from '../../store/reducers/contributors/contributorsActionCreator';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import TeamCard from '../TeamCard/TeamCard';

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

  team.forEach((contributor) => {
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
                      section.sectionName.toLowerCase().includes('end')
                        ?
                        <>
                          {section.sectionName.slice(0, - 3)}<span className='page__span'>{section.sectionName.slice(-3)}</span>
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
                            {section.sectionName.slice(0, - 3)}<span className='page__span'>{section.sectionName.slice(-3)}</span>
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
