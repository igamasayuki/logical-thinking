package jp.co.runy.logical_thinking.util;

import jp.co.runy.logical_thinking.exception.SessionTypeConversionExeption;

import static jp.co.runy.logical_thinking.util.ErrorUtil.*;

/**
 * @author yokogawayukihiro
 * セッションオブジェクトからデータを取得した際の型を変換するクラス.
 */
public final class SessionTypeConversion {

    /**
     * セッションオブジェクトからデータを取得したオブジェクトの型をIntegerに変換するメソッド.
     */ 
    public Integer typeConversionStringToInteger(Object sessionObject) throws SessionTypeConversionExeption {
        final String stringObject = String.valueOf(sessionObject);
        Integer integerObject;
        try {
            integerObject = Integer.parseInt(stringObject);
        } catch(Exception e) {
            throw new SessionTypeConversionExeption(E001);
        }
        return integerObject;
    }

    public SessionTypeConversion () {

    }

}
