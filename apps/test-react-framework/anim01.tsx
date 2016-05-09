import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as flux from '../../react-framework/exports';

var moduleId = 'ANUM01';

//****************** Main Entry Point
export function init() {
  flux.StoreApp.bootApp(AppStore);
}

//****************** App Store
@flux.StoreDef({ moduleId: moduleId })
export class AppStore extends flux.StoreApp {
  getStartRoute(): flux.TRouteActionPar { return flux.createRoute(AppRootStore); }
  getIsHashRouter(): boolean { return true; }
  render(): JSX.Element {
    return <div>
      <style type='text/css'>{`
        .example-enter {
          opacity: 0.01;
        }
        .example-enter.example-enter-active {
          opacity: 1;
        transition: opacity 0.5s ease-in;
        }
        .example-leave {
          opacity: 1;
        }
        .example-leave.example-leave-active {
          opacity: 0.01;
        transition: opacity 0.5s ease-out;
        }
        .example-appear {
          opacity: 0.01;
        }
        .example-appear.example-appear-active {
          opacity: 1;
        transition: opacity 0.5s ease-in;
        }
        #menu {
          xopacity: 0; 
          xtransition: opacity 2s ease;
        }
      `}</style>
      {super.render() }
    </div>;
  }
}

//****************** AppRoot component
export class AppRoot extends flux.Component<AppRootStore, {}> {
}
var cnt = 0;

@flux.StoreDef({ moduleId: moduleId, componentClass: AppRoot })
export class AppRootStore extends flux.Store<{}> {

  componentDidMount() {
    var menu = ReactDOM.findDOMNode(this.menu);
    setTimeout(() => {
      //menu.className = 'menu transition animating slide down out visible';
      //menu.setAttribute('style', 'display:block !important')
    }, 1000);
    var item = ReactDOM.findDOMNode(this.item);
    setTimeout(() => {
      //item.setAttribute('style', 'opacity: 1')
    }, 1000);
    //https://www.smashingmagazine.com/2014/09/animating-without-jquery/
    //close left: http://codepen.io/glovelidge/pen/RNMObe
    //margin top animation: http://jsfiddle.net/Zeaklous/WnHB6/1/
    //demo for popup: http://codepen.io/macsupport/pen/OPwvwx
    //Velocity(this.velocity, { opacity: 0, marginTop: '200px', marginLeft: '200px' }, { duration: 500, complete: els => { } });
    //Velocity(this.velocity, { opacity: 1, marginTop: '120px', marginLeft: '0px' }, { duration: 500, complete: els => { } });
    //debugger;
    //this.velocity.offsetWidth = 0;
    setTimeout(() => {

      //Velocity(this.velocity, 'fadeIn', { duration: 2000, complete: nodes => Velocity(this.velocity2, 'fadeIn', { duration: 2000 }) });
      //Velocity(this.velocity, 'fadeIn', { duration: 2000 });
      //Velocity(this.velocity2, 'fadeIn', { duration: 2000 });

      //*** promise
      Velocity.animate(this.velocity, 'fadeIn', { duration: 400 }).then(x => Velocity.animate(this.velocity2, 'fadeIn', { duration: 400 }));
    

      //*** sequence
      //Velocity.RunSequence( [
      //  { e: this.velocity, p: { translateX: 200 }, o: { duration: 1000 } },
      //  { e: this.velocity2, p: { translateX: 200 }, o: { duration: 1000, sequenceQueue: false} },
      //  { e: this.velocity, p: { translateX: 0 }, o: { duration: 1000 } },
      //  { e: this.velocity2, p: { translateX: 0 }, o: { duration: 1000, sequenceQueue: false } },
      //]);

      //*** queue
      //Velocity(this.velocity, { opacity: [0, 'easeInSine', 1] }, { duration: 2000, queue: 'q0' });
      //Velocity(this.velocity, { marginTop: '200px' }, { duration: 2000, queue: 'q1' });
      //Velocity(this.velocity, { marginLeft: '200px' }, { duration: 2000, queue: 'q1' });
      //Velocity.Utilities.dequeue(this.velocity, 'q0');
      //Velocity.Utilities.dequeue(this.velocity, 'q1');

      //Velocity(this.velocity, 'slideDown', { display: 'block', duration: 300, complete: els => { } });
      //Velocity(this.velocity, 'slideUp', { display: 'none', duration: 300 });

      //Velocity(this.velocity, 'fadeIn', { display: 'block', duration: 2000 });
      //Velocity(this.velocity, 'fadeOut', { display: 'none', duration: 2000, complete: els => { } });

      //Velocity(this.velocity, 'transition.bounceLeftIn');
      //Velocity(this.velocity, 'transition.bounceLeftIn', { backwards:true });

      //Velocity(this.velocity, 'transition.expandIn');
      //Velocity(this.velocity, 'transition.expandOut', { backwards: true });
      //Velocity(this.velocity, 'transition.bounceLeftOut', { display: 'block' });

      //Velocity(this.velocity, 'transition.perspectiveLeftOut');
      //Velocity(this.velocity, 'transition.perspectiveLeftIn');
      //Velocity(this.velocity, 'transition.slideLeftBigOut');
      //Velocity(this.velocity, 'transition.slideLeftBigIn');
      //Velocity(this.velocity, 'transition.flipBounceXOut');
      //Velocity(this.velocity, 'transition.flipBounceXIn');
      //Velocity(this.velocity, 'transition.swoopIn');
      //Velocity(this.velocity, 'transition.swoopOut');
      //Velocity(this.velocity, 'transition.slideLeftOut');
      //Velocity(this.velocity, 'transition.slideLeftIn');
      //Velocity(this.velocity, { translateX: "200px", rotateZ: "90deg" });
      //Velocity(this.velocity, { rotateZ: "0deg", translateX: "0" });
    }, 100);
    //Velocity(this.velocity, { opacity: 0.1 }, { duration: 1000 })(this.velocity, { opacity: 1.0 }, { duration: 1000});
    //item.setAttribute('style', 'opacity: 1')
  }

  render(): JSX.Element {
    return <div>
      <h2 onClick={ev => { this.modify(st => st.on = !st.on); } }>ANIM</h2>
      <React.addons.CSSTransitionGroup transitionAppear={true} transitionEnter={this.on} transitionLeave={!this.on} transitionName="example" transitionAppearTimeout={500} transitionEnterTimeout={500} transitionLeaveTimeout={500} component='h1'>
        {this.on ? <span>XXXXX</span> : null}
      </React.addons.CSSTransitionGroup>
      <div className="ui text menu">
        <div className="ui dropdown item" ref={item => this.item = item}>
          More
          <i className="dropdown icon"></i>
          {/*
            https://github.com/Semantic-Org/Semantic-UI/blob/42e41c2699691ff59c148a41a326a9b874a0f08e/src/themes/default/modules/transition.overrides
            Semantic-UI/src/themes/default/modules/transition.overrides
          */}
          <div id="menu" ref={menu => this.menu = menu} tabIndex={-1} className='menu transition animating xscale slide down in visible'>
            <div className="item">Applications</div>
            <div className="item">International Students</div>
            <div className="item">Scholarships</div>
          </div>
        </div>
      </div>
      <div id='velocity' style={{ marginTop: "120px", width: '200px' }} >
        <h1 style={{ opacity: 0, border: '1px solid black' }} ref={velocity => this.velocity = velocity}>Velocity<br/>Velocity<br/>Velocity<br/>Velocity<br/>Velocity<br/></h1>
      </div>
      <div id='velocity2' style={{ marginTop: "10px", width: '200px' }} >
        <h1 style={{ opacity: 0, border: '1px solid black' }} ref={velocity => this.velocity2 = velocity}>Velocity<br/>Velocity<br/>Velocity<br/>Velocity<br/>Velocity<br/></h1>
      </div>
    </div>;
  }
  on = true;
  menu;
  item;
  velocity: HTMLElement;
  velocity2: HTMLElement;
}

//<div id="menu" ref={menu => this.menu = menu} tabIndex={-1} className='menu transition animating slide down in visible'>