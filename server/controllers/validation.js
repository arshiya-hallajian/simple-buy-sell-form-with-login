//validation library
const joi = require('joi');

//register validation
const registerValidation = (data) => {
    const schema = joi.object({
        email: joi.string().min(6).required().email().messages({
            'string.base': `لطفا تنها متن وارد کنید`,
            'string.empty': `لطفا ایمیل خود را وارد کنید`,
            'string.min': `ایمیل وارد شده باید بیشتر از 6 حرف باشد`,
            'string.email': `ایمیل وارد شده صحیح نیست`,
        }),
        password: joi.string().min(6).required().messages({
            'string.empty': `لطفا رمز خود را وارد کنید`,
            'string.min': `رمز وارد شده باید بیشتر از 6 رقم باشد`
        }),
        password2: joi.any().valid(joi.ref('password')).required().messages({
            "any.only" : "پسورد شما یکسان نیست"
        })
    });
    return schema.validate(data);
};


//login validation
const loginValidation = (data) => {
    const schema = joi.object({
        email: joi.string().min(6).required().email().messages({
            'string.base': `لطفا تنها متن وارد کنید`,
            'string.empty': `لطفا ایمیل خود را وارد کنید`,
            'string.min': `ایمیل وارد شده باید بیشتر از 6 حرف باشد`,
            'string.email': `ایمیل وارد شده صحیح نیست`,
        }),
        password: joi.string().min(6).required().messages({
            'string.empty': `لطفا رمز خود را وارد کنید`,
            'string.min': `رمز وارد شده باید بیشتر از 6 رقم باشد`
        })
    });
    return schema.validate(data);
};

const valorant = (data) => {
  const schema = joi.object({
      region: joi.string().required().max(15).messages({
          'string.max': `لطفا ریجن اکانت خود را وارد کنید`
      }),
      rank: joi.string().required().max(15).messages({
          'string.max': `لطفا رنک اکانت مورد نظر را وارد کنید`
      }),
      m_mail: joi.boolean().required(),
      m_email: joi.when('m_mail', {is: true, then: joi.string().required().min(6).email(), otherwise: joi.optional()}).messages({
          'string.empty': `لطفا ایمیل مادر را وارد کنید`,
          'string.min': `ایمیل وارد شده باید بیشتر از 6 حرف باشد`,
          'string.email': `ایمیل وارد شده صحیح نیست`,
      }),
      agents: joi.string().required().max(15).messages({
          'string.max': `لطفا تعداد اجنت مورد نظر را وارد کنید`
      }),
      skins: joi.optional(),
      desc: joi.optional(),
      photos_number: joi.number().default(0).greater(2).messages({
          'number.greater': "باید بیشتر از 3 عکس انتخواب کنید"
      }),
      level: joi.string().required().pattern(/^[0-9]+$/).messages({
          'string.base': `لطفا در قسمت لول تنها عدد وارد کنید`,
          'string.empty': `لطفا لول اکانت خود را وارد کنید`,
          'string.pattern.base': `لطفا تنها عدد وارد کنید`
      }),
      account_name: joi.string().required().messages({
          'string.empty': `لطفا اسم اکانت را وارد کنید`
      }),
      valorant_point: joi.string().required().pattern(/^[0-9]+$/).messages({
          'string.base': `لطفا تنها عدد را وارد کنید`,
          'string.empty': `تعداد ولورانت پوینت خود را وارد کنید`,
          'string.pattern.base': `لطفا تنها عدد وارد کنید`
      }),
      radiant_point: joi.string().required().pattern(/^[0-9]+$/).messages({
          'string.base': `لطفا تنها عدد را وارد کنید`,
          'string.empty': `تعداد ردیانت پوینت خود را وارد کنید`,
          'string.pattern.base': `لطفا تنها عدد وارد کنید`
      })
  });
    return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.valorantValidation = valorant;