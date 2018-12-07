<template>
  <div class="home">
    <form @submit.prevent>
      <div v-if="!isSubmitted">
        <span class="form-item">
        <font-awesome-icon icon="user" class="icon"/>
        <input id="fullname"
            class="text-input"
            type="text"
            placeholder="Full name"
            v-model="fullname"
        >
        </span>
        <span class="form-item">
        <font-awesome-icon icon="at" class="icon"/>
            <input id="email"
                class="text-input"
                type="text"
                placeholder="Email"
                v-model="email"
            >
        </span>
        <span class="form-item">
        <font-awesome-icon icon="prescription" class="icon"/>
        <input id="medicine"
            class="text-input"
            type="text"
            placeholder="Medicine Name"
            v-model="medicine"
        >
        </span>
        <span class="form-item">
        <font-awesome-icon icon="calendar" class="icon"/>
        <select id="daysupply" v-model="dayorder">
            <option>Days supply of RX</option>
            <option>30</option>
            <option>60</option>
            <option>90</option>
            <option>100</option>
            <option>120</option>
        </select>
        </span>
        </div>
        <div id="response-text">
            <ThankYou
              :fullname="firstName"
              :email="email"
              :medicine="medicine"
              :dayorder="dayorderString"
              :isSubmitted="isSubmitted"
            />
        </div>
        <p class="error">{{errorMessage}}</p>
        <p class="p-button">
            <button
              v-if="!isSubmitted"
              class="button"
              @click="onSubmit()"
            >Set Reminder</button>
            <button
              v-if="isSubmitted"
              @click="setOtherReminder()"
              class="button"
            >Close</button>
        </p>
        <div>
          <WarningMessage :isSubmitted="isSubmitted" :reactions="reactions"/>
        </div>
    </form>
  </div>
</template>
<script>
import ThankYou from './ThankYou.vue';
import WarningMessage from './WarningMessage.vue';

const getDrugInfo = (drugName, callback) => {
  const url = `https://api.fda.gov/drug/event.json?search=patient.drug.medicinalproduct:${drugName}&limit=1`;
  fetch(url)
    .then(response => response.json())
    .then((myJson) => {
      if (myJson.error) {
        callback(undefined);
      } else {
        const reactions = myJson.results[0].patient.reaction;
        let symtom = reactions.length;
        if (reactions.length > 5) {
          symtom = 5;
        }
        callback(reactions.slice(0, symtom));
      }
    })
    .catch((e) => {
      callback(e);
    });
};

const validEmail = (email) => {
  // eslint-disable-next-line
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

export default {
  name: 'SubmitForm',
  components: {
    ThankYou,
    WarningMessage,
  },
  props: {
    msg: String,
  },
  data() {
    return {
      isSubmitted: false,
      fullname: '',
      firstName: '',
      email: '',
      medicine: '',
      dayorder: 90,
      dayorderString: '',
      reactions: [],
      errorMessage: '',
    };
  },
  methods: {
    onSubmit() {
      if (!this.fullname) {
        this.errorMessage = 'Full name is required!';
      } else if (!this.email || !validEmail(this.email)) {
        this.errorMessage = 'Invalid email address!';
      } else if (!this.medicine) {
        this.errorMessage = 'Please enter medicine name!';
      } else if (!Number.isInteger(parseInt(this.dayorder, 10))) {
        this.errorMessage = 'Please select day of order';
      } else {
        this.isSubmitted = true;
        [this.firstName] = this.fullname.split(' ');
        const options = {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        };
        this.errorMessage = '';
        const today = new Date().getTime();
        const noticeday = today + ((parseInt(this.dayorder, 10) - 5) * 86400000);
        this.dayorderString = new Date(noticeday).toLocaleDateString('en-US', options);
        getDrugInfo(this.medicine, (reactions) => {
          if (reactions) {
            this.reactions = reactions;
          }
        });
      }
    },
    setOtherReminder() {
      this.isSubmitted = false;
      this.fullname = '';
      this.firstName = '';
      this.email = '';
      this.medicine = '';
      this.dayorder = 90;
      console.log('Set other reminder');
    },
  },
};
</script>

<style scoped lang="scss">
.home {
  text-align: left;
}
.icon {
  width: 20px;
}
.form-item {
  width: 220px;
  margin-top: 50px;
  margin-bottom: 50px;
  margin-left: 20px;
  display: inline-block;
  padding-left: 20px;

}
.text-input {
    height: 20px;
    width: 200;
    padding: 10px;
    border: solid;
    border-width: 1px;
    border-radius: 5px;
    border-color: #6c727b;
    margin-left: 10px;
}
select {
    height: 40px;
    width: 180px;
    margin-left: 10px;
    padding: 10px;
    font-size: 15px;
    color:#6c727b;
    border: solid;
    border-width: 1px;
    border-radius: 5px;
    border-color: #6c727b;
}
.button {
    height: 40px;
    width: 150px;
    color: white;
    font-size: 15px;
    background: #5591e2;
}
.p-button {
    margin-top: 50px;
    text-align: center;
    width: 500px;
    }
input[type="text"] {
  font-size: 15px;
  color: rgb(123, 131, 241);
}
.error {
  text-align: center;
  color: red;
  font-weight: bold;
  width: 500px;
}

@media only screen and (max-width: $mobile-screen) {
.p-button {
    margin-top: 10px;
    text-align: center;
    width: 100%;
    padding-bottom: 20px;
    }
.error {
  text-align: center;
  color: red;
  font-weight: bold;
  width: 90%;
}
.button {
    height: 40px;
    width: 150px;
    color: white;
    font-size: 15px;
    background: #5591e2;
    margin: 20px;
}
.form-item {
  width: calc(100% - 30px);
  margin-top: 20px;
  margin-bottom: 20px;
  margin-left: 10px;
  padding-right: 0px;
  display: inline-block;
  padding-left: 0px;
}
.text-input {
    height: 20px;
    width: calc(100% - 60px);
    padding: 10px;
    border: solid;
    border-width: 1px;
    border-radius: 5px;
    border-color: #6c727b;
    margin-left: 10px;
}
select {
    width: calc(100% - 40px);
}
}
</style>
