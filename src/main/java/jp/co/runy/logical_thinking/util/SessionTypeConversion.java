package jp.co.runy.logical_thinking.util;

import jp.co.runy.logical_thinking.exception.SessionTypeConversionExeption;

import static jp.co.runy.logical_thinking.util.ErrorUtil.*;

public final class SessionTypeConversion {
    
    public Integer typeConversionStringToInteger(Object sessionObject) throws SessionTypeConversionExeption {
        final String stringId = String.valueOf(sessionObject);
        Integer id;
        try {
            id = Integer.parseInt(stringId);
        } catch(Exception e) {
            throw new SessionTypeConversionExeption(E001);
        }
        return id;
    }

    public SessionTypeConversion () {

    }

}
